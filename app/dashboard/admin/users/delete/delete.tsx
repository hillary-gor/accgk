"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../actions";

export default function DeleteUserPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");

  const [user, setUser] = useState({ id: "", name: "" });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const users = await fetchUsers();
      const foundUser = users.find((u) => u.id === userId);
      if (foundUser) setUser(foundUser);
    }
    if (userId) loadUser();
  }, [userId]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteUser(user.id);
      router.push("/dashboard/admin/users");
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Delete User</h2>
      <p>Are you sure you want to delete {user.name}?</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        {deleting ? "Deleting..." : "Yes, Delete"}
      </button>
    </div>
  );
}
