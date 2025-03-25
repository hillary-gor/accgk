"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchUsers, updateUser } from "../actions";

export default function EditUserPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");

  const [user, setUser] = useState({ id: "", name: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const users = await fetchUsers();
      const foundUser = users.find((u) => u.id === userId);
      if (foundUser) setUser(foundUser);
      setLoading(false);
    }
    if (userId) loadUser();
  }, [userId]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateUser(user.id, user.name, user.role);
      router.push("/dashboard/admin/users");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center">Loading user...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border p-2 w-full mb-4"
      />
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="border p-2 w-full mb-4"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2"
      >
        {updating ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
}
