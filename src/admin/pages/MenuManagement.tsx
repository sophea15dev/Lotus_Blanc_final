import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Edit3, Trash2, Loader2, AlertCircle } from "lucide-react";

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

      setItems(dishesRes.data);
      setCategories(catsRes.data);

      if (catsRes.data.length > 0) {
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

  // ================= SUBMIT (FIXED) =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    console.log("DEBUG FORM:", formData);

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    const price = Number(formData.price);
    if (isNaN(price)) {
      setError("Price must be a number");
      return;
    }

    if (!formData.categoryId) {
      setError("Category is required");
      return;
    }

    const data = new FormData();

    // MUST MATCH BACKEND FIELD NAMES
    data.append("name", formData.name.trim());
    data.append("price", String(price));
    data.append("categoryId", String(formData.categoryId));
    data.append("description", formData.description || "");

    // IMAGE FIELD (IMPORTANT)
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const url = editingItem
        ? `http://localhost:8000/api/dishes/${editingItem.id}`
        : `http://localhost:8000/api/dishes`;

      await axios({
        method: editingItem ? "put" : "post",
        url,
        data,
        headers: {
          // DO NOT set Content-Type manually (IMPORTANT FIX)
        },
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
      console.log("SUBMIT ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Failed to save dish");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/dishes/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      console.log("DELETE ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // ================= UI (UNCHANGED) =================
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>

        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Dish
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 mb-4 flex gap-2">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsModalOpen(true);
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

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 w-[400px] space-y-3"
          >
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border p-2"
            />

            <input
              placeholder="Price"
              type="number"
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
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border p-2"
            />

            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] || null)
              }
            />

            <button className="bg-blue-600 text-white w-full p-2">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;