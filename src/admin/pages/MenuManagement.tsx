import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Edit3, Trash2, Loader2, AlertCircle, X } from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type Dish = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  categoryId: number;
  isPublic?: boolean;
};

const MenuManagement: React.FC = () => {
  const [items, setItems] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Dish | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
  });

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const [dishesRes, catsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/dishes"),
        axios.get("http://localhost:8000/api/categories"),
      ]);

      setItems(dishesRes.data || []);
      setCategories(catsRes.data || []);

      if (catsRes.data?.length > 0) {
        setFormData((prev) => ({
          ...prev,
          categoryId: prev.categoryId || String(catsRes.data[0].id),
        }));
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SUBMIT (FIXED 400 ERROR) =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const price = Number(formData.price);
    const categoryId = Number(formData.categoryId);

    if (!formData.name.trim()) return setError("Name is required");
    if (isNaN(price)) return setError("Price must be a valid number");
    if (isNaN(categoryId)) return setError("Category is required");

    try {
      const url = editingItem
        ? `http://localhost:8000/api/dishes/${editingItem.id}`
        : `http://localhost:8000/api/dishes`;

      let data: any;

      // ================= FORM DATA (IMAGE) =================
      if (selectedFile) {
        data = new FormData();
        data.append("name", formData.name.trim());
        data.append("price", String(price));
        data.append("categoryId", String(categoryId));
        data.append("description", formData.description || "");
        data.append("image", selectedFile);
      } else {
        // ================= JSON (NO IMAGE) =================
        data = {
          name: formData.name.trim(),
          price,
          categoryId,
          description: formData.description || "",
        };
      }

      await axios({
        method: editingItem ? "put" : "post",
        url,
        data,
        headers: selectedFile
          ? {} // DO NOT set Content-Type manually
          : { "Content-Type": "application/json" },
      });

      await fetchData();

      setIsModalOpen(false);
      setEditingItem(null);
      setSelectedFile(null);

      setFormData({
        name: "",
        price: "",
        categoryId: "",
        description: "",
      });
    } catch (err: any) {
      console.log("BACKEND ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Error creating dish");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/dishes/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Delete failed");
    }
  };

  // ================= TOGGLE =================
  const toggleVisibility = async (item: Dish) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/dishes/${item.id}`,
        { isPublic: !item.isPublic }
      );

      setItems((prev) =>
        prev.map((d) =>
          d.id === item.id ? { ...d, isPublic: !d.isPublic } : d
        )
      );
    } catch {
      setError("Failed to update visibility");
    }
  };

  // ================= UI (UNCHANGED) =================
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Menu Management
          </h1>

          <button
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
          >
            + Add Dish
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 mb-6 flex gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 shadow rounded-xl">

                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleVisibility(item)}>
                    Toggle
                  </button>

                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                      setFormData({
                        name: item.name,
                        price: String(item.price),
                        categoryId: String(item.categoryId),
                        description: item.description || "",
                      });
                    }}
                  >
                    <Edit3 />
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
                    <Trash2 />
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

        {/* MODAL (UNCHANGED) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 w-[420px] rounded-xl space-y-4"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3"
              >
                <X />
              </button>

              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border p-2"
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border p-2"
              />

              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full border p-2"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full border p-2"
              />

              <input
                type="file"
                onChange={(e) =>
                  setSelectedFile(e.target.files?.[0] || null)
                }
              />

              <button className="bg-blue-600 text-white w-full py-2">
                Save
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default MenuManagement;