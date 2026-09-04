import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                eduVerse
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Learn without limits. Transform your future with world-class education.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-lg p-2 hover:bg-muted transition-colors">
                <Facebook className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="rounded-lg p-2 hover:bg-muted transition-colors">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="rounded-lg p-2 hover:bg-muted transition-colors">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="rounded-lg p-2 hover:bg-muted transition-colors">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="rounded-lg p-2 hover:bg-muted transition-colors">
                <Youtube className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
              <li><Link to="/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Teaching */}
          <div>
            <h4 className="font-semibold mb-4">Teaching</h4>
            <ul className="space-y-3">
              <li><Link to="/teach" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Become Instructor</Link></li>
              <li><Link to="/teaching-center" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Teaching Center</Link></li>
              <li><Link to="/instructor-rules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instructor Rules</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
              <li><Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 eduVerse, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              English
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
