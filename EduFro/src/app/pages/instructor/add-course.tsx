import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Upload, Plus, X } from "lucide-react";

export function AddCourse() {
  const [step, setStep] = useState(1);
  const [sections, setSections] = useState([{ id: 1, title: "", lectures: [{ id: 1, title: "" }] }]);

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
              <Input placeholder="e.g., Complete Web Development Bootcamp" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Describe what students will learn..." rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select>
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
                <Input type="number" placeholder="99.99" />
              </div>
            </div>
            <div>
              <Label>Thumbnail</Label>
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-[#4F46E5] transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              </div>
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
                  <Input placeholder="Section title" className="flex-1" />
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 ml-4">
                  {section.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center gap-2">
                      <Input placeholder="Lecture title" className="flex-1" />
                      <Button variant="outline" size="sm">Upload Video</Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lecture
                  </Button>
                </div>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
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
              <p className="text-sm text-muted-foreground">Review your course before publishing</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 flex-1">
                Publish Course
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
