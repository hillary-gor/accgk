"use client";

import { useState, useEffect } from "react";
import {
  createMembershipCategory,
  updateMembershipCategory,
  deleteMembershipCategory,
} from "./membership-categories-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, Trash2, Edit3, Plus } from "lucide-react";
import Image from "next/image";
import { useDeleteStorageFile } from "@/hooks/useDeleteStorageFile";
import { toast } from "sonner";

interface MembershipCategory {
  id: string;
  title: string;
  description: string[];
  detailed_description: string;
  licensing_fee: number;
  initial_registration_fee: number;
  fee_details: string[];
  action_label: string;
  created_at: string;
  image_url: string;
}

export default function MembershipCategoriesPage() {
  const [categories, setCategories] = useState<MembershipCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<MembershipCategory | null>(null);
  const { deleteFile } = useDeleteStorageFile("assets");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/membership-categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Failed to fetch membership categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle create / update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const actionFn = editing
      ? updateMembershipCategory(editing.id, formData)
      : createMembershipCategory(formData);

    toast.promise(actionFn, {
      loading: editing ? "Updating category..." : "Saving category...",
      success: (res) => {
        if (res.success) {
          (e.target as HTMLFormElement).reset();
          setEditing(null);
          fetchCategories();
        }
        return res.message || "Saved successfully!";
      },
      error: (err) =>
        err?.message || "Something went wrong while saving category.",
    });

    setSaving(false);
  };

  // Handle delete
  const handleDelete = async (id: string, imageUrl?: string) => {
    toast("Confirm deletion", {
      description: "This action cannot be undone.",
      action: {
        label: "Confirm",
        onClick: async () => {
          toast.promise(
            (async () => {
              const res = await deleteMembershipCategory(id);
              if (res.success && imageUrl) await deleteFile(imageUrl);
              if (res.success) fetchCategories();
              return res;
            })(),
            {
              loading: "Deleting category...",
              success: (res) => res.message || "Deleted successfully.",
              error: (err) => err?.message || "Failed to delete category.",
            }
          );
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Membership Categories
          </h1>
        </div>

        {/* Form */}
        <Card className="mb-10">
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                name="name"
                defaultValue={editing?.title || ""}
                placeholder="Category title"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              {editing?.image_url && (
                <div className="w-32 h-32 relative mb-2 rounded-md overflow-hidden border">
                  <Image
                    src={editing.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <input type="file" name="image" accept="image/*" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description
              </label>
              <Textarea
                name="description"
                defaultValue={editing?.description?.[0] || ""}
                placeholder="Bullet-point style short description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Detailed Description
              </label>
              <Textarea
                name="detailed_description"
                defaultValue={editing?.detailed_description || ""}
                placeholder="Full paragraph or rich text content"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Initial Registration Fee (KES)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="initial_registration_fee"
                  defaultValue={editing?.initial_registration_fee || ""}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Licensing Fee (KES)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="licensing_fee"
                  defaultValue={editing?.licensing_fee || ""}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : editing ? (
                  "Update Category"
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* List */}
        {loading ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500 italic">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Card key={cat.id}>
                <CardHeader>
                  <CardTitle>{cat.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700 text-sm">
                    {cat.description?.[0]}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Total Fee: KES{" "}
                    {(
                      Number(cat.initial_registration_fee || 0) +
                      Number(cat.licensing_fee || 0)
                    ).toLocaleString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setEditing(cat)}
                    className="flex items-center gap-1"
                  >
                    <Edit3 className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(cat.id, cat.image_url)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
