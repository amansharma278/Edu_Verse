import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Upload, Plus, X } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";

interface Lecture {
  id: number;
  title: string;
  videoUrl?: string;
  isUploading?: boolean;
}

interface CourseSection {
  id: number;
  title: string;
  lectures: Lecture[];
}

export function AddCourse() {
  const [step, setStep] = useState(1);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<CourseSection[]>([
    { id: 1, title: "", lectures: [{ id: 1, title: "" }] },
  ]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Unable to read file"));
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });

  const uploadMedia = async (fileData: string, kind: "image" | "video") => {
    const token = localStorage.getItem("eduverse-token");
    const response = await fetch(`${apiUrl}/course/media`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({ file: fileData, kind }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Media upload failed");
    return data.url as string;
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    readFileAsDataUrl(file).then(setThumbnail).catch(() => setError("Unable to read thumbnail"));
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  const updateSection = (sectionId: number, title: string) => {
    setSections((current) => current.map((section) => section.id === sectionId ? { ...section, title } : section));
  };

  const updateLecture = (sectionId: number, lectureId: number, title: string) => {
    setSections((current) => current.map((section) => section.id === sectionId
      ? { ...section, lectures: section.lectures.map((lecture) => lecture.id === lectureId ? { ...lecture, title } : lecture) }
      : section));
  };

  const addSection = () => {
    const id = Date.now();
    setSections((current) => [...current, { id, title: "", lectures: [{ id: id + 1, title: "" }] }]);
  };

  const addLecture = (sectionId: number) => {
    setSections((current) => current.map((section) => section.id === sectionId
      ? { ...section, lectures: [...section.lectures, { id: Date.now(), title: "" }] }
      : section));
  };

  const removeSection = (sectionId: number) => {
    setSections((current) => current.length > 1 ? current.filter((section) => section.id !== sectionId) : current);
  };

  const handleVideoChange = async (sectionId: number, lectureId: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please select a video file");
      event.target.value = "";
      return;
    }

    setError("");
    setSections((current) => current.map((section) => section.id === sectionId
      ? { ...section, lectures: section.lectures.map((lecture) => lecture.id === lectureId ? { ...lecture, isUploading: true } : lecture) }
      : section));
    try {
      const videoUrl = await uploadMedia(await readFileAsDataUrl(file), "video");
      setSections((current) => current.map((section) => section.id === sectionId
        ? { ...section, lectures: section.lectures.map((lecture) => lecture.id === lectureId ? { ...lecture, videoUrl, isUploading: false } : lecture) }
        : section));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Video upload failed");
      setSections((current) => current.map((section) => section.id === sectionId
        ? { ...section, lectures: section.lectures.map((lecture) => lecture.id === lectureId ? { ...lecture, isUploading: false } : lecture) }
        : section));
    }
  };

  const publishCourse = async () => {
    if (!user?.id || !courseName.trim() || !thumbnail) {
      setError("Course title, instructor, and thumbnail are required");
      return;
    }

    setError("");
    setIsPublishing(true);
    try {
      const thumbnailUrl = thumbnail.startsWith("data:") ? await uploadMedia(thumbnail, "image") : thumbnail;
      const token = localStorage.getItem("eduverse-token");
      const response = await fetch(`${apiUrl}/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          courseName: courseName.trim(),
          courseDescription,
          instructor: user.id,
          price: Number(price) || 0,
          thumbnail: thumbnailUrl,
          tag: category ? [category] : [],
          sections: sections.map((section) => ({
            title: section.title,
            lectures: section.lectures.map((lecture) => ({ title: lecture.title, videoUrl: lecture.videoUrl })),
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Course creation failed");
      setStep(1);
      setError("");
      alert("Course published successfully");
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Course creation failed");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-muted-foreground">Share your knowledge with students worldwide</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
              step >= s ? "border-[#4F46E5] bg-[#4F46E5] text-white" : "border-muted bg-background text-muted-foreground"
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`h-0.5 flex-1 mx-2 transition-colors ${step > s ? "bg-[#4F46E5]" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Course Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Course Title</Label>
              <Input value={courseName} onChange={(event) => setCourseName(event.target.value)} placeholder="e.g., Complete Web Development Bootcamp" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={courseDescription} onChange={(event) => setCourseDescription(event.target.value)} placeholder="Describe what students will learn..." rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price (USD)</Label>
                <Input type="number" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="99.99" />
              </div>
            </div>
            <div>
              <Label>Thumbnail</Label>
              <label className="block border-2 border-dashed rounded-lg p-6 text-center hover:border-[#4F46E5] transition-colors cursor-pointer">
                {thumbnail ? (
                  <div className="relative">
                    <img src={thumbnail} alt="Course thumbnail preview" className="mx-auto h-48 w-full rounded-md object-cover" />
                    <button
                      type="button"
                      aria-label="Remove thumbnail"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        removeThumbnail();
                      }}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or WEBP</p>
                  </>
                )}
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleThumbnailChange}
                  className="sr-only"
                />
              </label>
            </div>
            <Button onClick={() => setStep(2)} className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
              Continue
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Curriculum Builder</h2>
          <div className="space-y-6">
            {sections.map((section, sIndex) => (
              <Card key={section.id} className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Input value={section.title} onChange={(event) => updateSection(section.id, event.target.value)} placeholder="Section title" className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(section.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 ml-4">
                  {section.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center gap-2">
                      <Input value={lecture.title} onChange={(event) => updateLecture(section.id, lecture.id, event.target.value)} placeholder="Lecture title" className="flex-1" />
                      <label className="inline-flex h-9 cursor-pointer items-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                        {lecture.isUploading ? "Uploading..." : lecture.videoUrl ? "Video Uploaded" : "Upload Video"}
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(event) => handleVideoChange(section.id, lecture.id, event)}
                          className="sr-only"
                          disabled={lecture.isUploading}
                        />
                      </label>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => addLecture(section.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lecture
                  </Button>
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" className="w-full" onClick={addSection}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 flex-1">
                Continue
              </Button>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Publish Course</h2>
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Course Summary</h3>
              <p className="text-sm text-muted-foreground">{courseName || "Untitled course"}</p>
              <p className="text-sm text-muted-foreground">{sections.length} section(s), {sections.reduce((total, section) => total + section.lectures.length, 0)} lecture(s)</p>
            </div>
            {error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</p>}
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={publishCourse} disabled={isPublishing} className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 flex-1">
                {isPublishing ? "Publishing..." : "Publish Course"}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
