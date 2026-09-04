import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Camera, AlertTriangle } from "lucide-react";

export function StudentProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1646369505413-216676fef89c?w=100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Profile Photo</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    PNG, JPG up to 5MB
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Upload New</Button>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input defaultValue="John" />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input defaultValue="Doe" />
                </div>
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate learner interested in web development and data science."
                />
              </div>

              <div>
                <Label>Website</Label>
                <Input defaultValue="https://johndoe.com" />
              </div>

              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label>Email Address</Label>
                <Input type="email" defaultValue="john.doe@example.com" />
              </div>

              <div>
                <Label>Username</Label>
                <Input defaultValue="johndoe" />
              </div>

              <div>
                <Label>Language</Label>
                <Input defaultValue="English" />
              </div>

              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                Update Account
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90">
                Change Password
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-destructive">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
