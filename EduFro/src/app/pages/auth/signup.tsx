import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth-context";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Card } from "../../components/ui/card";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";
import { User, Mail, Lock, Chrome, Github, GraduationCap, Users } from "lucide-react";

export function Signup() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"student" | "instructor" | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { authenticateUser } = useAuth();

  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

  async function requestOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/sendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send verification code");
      }

      setMessage(data.otp ? `Your verification code is ${data.otp}` : "Verification code sent");
      setStep(3);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send verification code");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitSignup() {
    setMessage("");
    setIsSubmitting(true);
    const nameParts = fullName.trim().split(/\s+/);

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" ") || nameParts[0],
          email,
          contact_no: contactNo,
          account_type: role,
          password,
          confirmPassword,
          otp,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create account");
      }

      authenticateUser(data.user, data.token);
      navigate(role === "instructor" ? "/instructor" : "/student", { replace: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <div className="hidden lg:block relative bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <span className="text-2xl font-bold">E</span>
              </div>
              <span className="text-2xl font-bold">eduVerse</span>
            </Link>
            <h1 className="text-4xl font-bold mb-4">Start Your Journey!</h1>
            <p className="text-xl text-white/90">
              Join millions of learners and instructors worldwide.
            </p>
          </div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1629360021730-3d258452c425?w=600"
            alt="Learning illustration"
            className="mt-12 rounded-2xl shadow-2xl max-w-lg"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                eduVerse
              </span>
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      step >= s
                        ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                        : "border-muted bg-background text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-colors ${
                        step > s ? "bg-[#4F46E5]" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Choose Role</span>
              <span>Details</span>
              <span>Verify</span>
            </div>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Choose your role</h2>
                <p className="text-muted-foreground">
                  Select how you want to use eduVerse
                </p>
              </div>

              <div className="grid gap-4">
                <Card
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-lg ${
                    role === "student"
                      ? "border-[#4F46E5] bg-[#4F46E5]/5"
                      : "border-border"
                  }`}
                  onClick={() => setRole("student")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10">
                      <GraduationCap className="h-7 w-7 text-[#4F46E5]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">I'm a Student</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn new skills and advance your career
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-6 cursor-pointer border-2 transition-all hover:shadow-lg ${
                    role === "instructor"
                      ? "border-[#4F46E5] bg-[#4F46E5]/5"
                      : "border-border"
                  }`}
                  onClick={() => setRole("instructor")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED]/10 to-[#4F46E5]/10">
                      <Users className="h-7 w-7 text-[#7C3AED]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">I'm an Instructor</h3>
                      <p className="text-sm text-muted-foreground">
                        Share your knowledge and earn money
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!role}
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90"
                size="lg"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Basic Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Create your account</h2>
                <p className="text-muted-foreground">
                  Fill in your details to get started
                </p>
              </div>

              <form className="space-y-4" onSubmit={requestOtp}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-no">Contact number</Label>
                  <Input
                    id="contact-no"
                    type="tel"
                    placeholder="9999999999"
                    value={contactNo}
                    onChange={(event) => setContactNo(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90"
                  size="lg"
                >
                  {isSubmitting ? "Sending code..." : "Continue"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Back
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline">
                    <Chrome className="mr-2 h-5 w-5" />
                    Google
                  </Button>
                  <Button type="button" variant="outline">
                    <Github className="mr-2 h-5 w-5" />
                    Github
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 mx-auto mb-4">
                  <Mail className="h-8 w-8 text-[#4F46E5]" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Verify your email</h2>
                <p className="text-muted-foreground">
                  We've sent a verification code to
                  <br />
                  <span className="font-medium text-foreground">
                    {email}
                  </span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="button"
                  onClick={submitSignup}
                  disabled={isSubmitting || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90"
                  size="lg"
                >
                  {isSubmitting ? "Creating account..." : "Verify & Create Account"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="w-full"
                >
                  Back
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button className="font-medium text-[#4F46E5] hover:underline">
                    Resend code
                  </button>
                </p>
              </div>
            </div>
          )}

          {message && (
            <p className="mt-4 text-center text-sm text-muted-foreground">{message}</p>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#4F46E5] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
