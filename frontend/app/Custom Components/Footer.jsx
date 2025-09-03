import { Calendar, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-slate-400" />
              <span className="text-xl font-bold text-white">EventPoll</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Simplifying event planning and scheduling through collaborative polling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                About
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} EventPoll. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              Built with ❤️ using MERN Stack
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}