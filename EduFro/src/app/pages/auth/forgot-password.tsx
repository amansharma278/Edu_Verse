import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";

export function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#4F46E5]/5 via-[#7C3AED]/5 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              eduVerse
            </span>
          </Link>

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 mx-auto mb-6">
            <Mail className="h-8 w-8 text-[#4F46E5]" />
          </div>

          <h2 className="text-3xl font-bold mb-2">Forgot your password?</h2>
          <p className="text-muted-foreground">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90"
            size="lg"
          >
            Send Reset Link
          </Button>

          <Link to="/login">
            <Button
              type="button"
              variant="ghost"
              className="w-full gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Log in
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
