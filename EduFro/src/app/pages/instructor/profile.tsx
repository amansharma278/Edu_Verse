import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { toast } from "sonner";
import { useAuth } from "../../contexts/auth-context";
import { Camera, Save } from "lucide-react";

export function InstructorProfile() {
  const { user, updateUser } = useAuth();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("eduverse-token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch(`${apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to load profile");
        return data.user;
      })
      .then((profile) => {
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setEmail(profile.email || "");
        setHeadline(profile.additionDetails?.headline || "");
        setBio(profile.additionDetails?.about || "");
      })
      .catch((error) => toast.error(error instanceof Error ? error.message : "Unable to load profile"))
      .finally(() => setIsLoading(false));
  }, [apiUrl]);

  async function handleSave() {
    const token = localStorage.getItem("eduverse-token");
    setIsSaving(true);

    try {
      const response = await fetch(`${apiUrl}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, email, headline, about: bio }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to update profile");

      updateUser({ name: `${firstName} ${lastName}`.trim(), email });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update profile");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Instructor Profile</h1>
        <p className="text-muted-foreground">Manage your public instructor profile</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name.slice(0, 2).toUpperCase() || "IN"}</AvatarFallback>
            </Avatar>
            <div>
              <Button size="sm" type="button" className="gap-2">
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">Profile image is managed from your account.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} disabled={isLoading} />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input value={lastName} onChange={(event) => setLastName(event.target.value)} disabled={isLoading} />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isLoading} />
          </div>
          <div>
            <Label>Professional Headline</Label>
            <Input value={headline} onChange={(event) => setHeadline(event.target.value)} disabled={isLoading} />
          </div>
          <div>
            <Label>Biography</Label>
            <Textarea rows={6} value={bio} onChange={(event) => setBio(event.target.value)} disabled={isLoading} />
          </div>
          <Button onClick={handleSave} disabled={isLoading || isSaving} className="gap-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
