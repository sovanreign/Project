"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import axios from "axios";
import {
  UserIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import LoadingPage from "../components/LoadingPage";
import { ProfileProvider, useProfile } from "./profile/contexts/ProfileContext";

const sidebarItems = [
  { label: "Profile", link: "/ccms/profile", icon: UserIcon },
  { label: "Students", link: "/ccms/students", icon: UserGroupIcon },
  { label: "Coaches", link: "/coaches", icon: AcademicCapIcon },
  {
    label: "Manage Coaching",
    link: "/manage-coaching",
    icon: ClipboardDocumentListIcon,
  },
  { label: "Programs", link: "/programs", icon: BookOpenIcon },
  { label: "Notifications", link: "/notifications", icon: BellIcon },
  {
    label: "Logout",
    link: "/settings",
    icon: ArrowRightOnRectangleIcon,
  },
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { profile, setProfile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/profile", {
          withCredentials: true,
        });
        setProfile(response.data.data);
      } catch (err: any) {
        console.error("Error fetching profile data:", err.response);
        setError(err.response?.data?.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setProfile]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          uniqueId={profile?.uniqueId}
          isLoading={loading}
        />

        {/* Content Area with Skeleton or Error */}
        {loading ? (
          <LoadingPage />
        ) : error ? (
          <div className="p-8 text-red-500">Error: {error}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <LayoutContent>{children}</LayoutContent>
    </ProfileProvider>
  );
}
