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
  imageUrl?: string;
  categoryId: number;
};

const API_BASE = "http://localhost:8000";

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
    imageUrl: "",
  });

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const [dishesRes, catsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/dishes`),
        axios.get(`${API_BASE}/api/categories`),
      ]);

      const dishes = Array.isArray(dishesRes.data)
        ? dishesRes.data
        : dishesRes.data.data || [];

      const cats = Array.isArray(catsRes.data)
        ? catsRes.data
        : catsRes.data.data || [];

      setItems(dishes);
      setCategories(cats);

      if (cats.length > 0) {
        setFormData((prev) => ({
          ...prev,
          categoryId: prev.categoryId || String(cats[0].id),
        }));
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= OPEN MODAL =================
  const openModal = (item?: Dish) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        price: String(item.price),
        categoryId: String(item.categoryId),
        description: item.description || "",
        imageUrl: item.imageUrl || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        price: "",
        categoryId: categories[0] ? String(categories[0].id) : "",
        description: "",
        imageUrl: "",
      });
    }

    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
      imageUrl: formData.imageUrl,
    };

    try {
      if (editingItem) {
        await axios.put(`${API_BASE}/api/dishes/${editingItem.id}`, payload);
      } else {
        await axios.post(`${API_BASE}/api/dishes`, payload);
      }

      await fetchData();

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err: any) {
      console.error("SUBMIT ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to save dish");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/api/dishes/${id}`);
      await fetchData();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>

        <button
          onClick={() => openModal()}
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
                <button onClick={() => openModal(item)}>
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
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border p-2"
            />

            <input
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageUrl: e.target.value,
                })
              }
              className="w-full border p-2"
            />

            <button className="bg-blue-600 text-white w-full p-2">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
