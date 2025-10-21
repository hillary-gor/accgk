// components/layout/AuthHeader.tsx
// This component handles user authentication and displays user profile information in the header.
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton } from "@/app/auth/SignOutButton";
import { Button } from "@/components/ui/button";
import { Settings, User as UserIcon, Calendar } from "lucide-react";
import Link from "next/link";

interface Profile {
  full_name: string;
  profile_picture_url: string | null;
}

export function AuthHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      try {
        setError(null);
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (user && isMounted) {
          setUser(user);

          const {
            data: profileData,
            error: profileError,
          } = await supabase
            .from("profiles")
            .select("full_name, profile_picture_url")
            .eq("id", user.id)
            .single();

          if (profileError) {
            console.warn("Profile fetch error:", profileError);
            // Set a default profile if profile doesn't exist
            setProfile({
              full_name: user.email?.split("@")[0] || "User",
              profile_picture_url: null,
            });
          } else if (profileData && isMounted) {
            setProfile(profileData);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load user data"
          );
          console.error("Auth error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUserData();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      } else if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        // Refetch profile data
        fetchUserData();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return (
      <div
        className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"
        aria-label="Loading user data"
      />
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/auth/signup">Register</Link>
        </Button>
      </div>
    );
  }

  if (user && profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8 border border-gray-200">
              {profile.profile_picture_url ? (
                <AvatarImage
                  src={profile.profile_picture_url}
                  alt={`${profile.full_name} profile picture`}
                />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white text-xs">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none truncate">
                {profile.full_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>My Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/login">Sign In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/signup">Register</Link>
      </Button>
    </div>
  );
}
