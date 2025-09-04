"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isAuthenticated = user;
  console.log(isAuthenticated);

  const userName = user?.name || "Guest";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Calendar className="h-8 w-8 text-slate-300" />
            <span className="text-2xl font-bold text-white">EventPoll</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/events"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  All Events
                </Link>

                <Link
                  href="/notifications"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Notification
                </Link>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                    onClick={logout} // ✅ context logout
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button className="bg-slate-600 hover:bg-slate-500 text-white border-0">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/events/create"
                    className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                  <Link
                    href="/notifications"
                    className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Notifications
                  </Link>
                  <div className="border-t border-slate-700 my-2"></div>
                  <div className="px-3 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-left justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-slate-600 hover:bg-slate-500 text-white border-0">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
