import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit3, Trash2, Upload, X, ImageIcon, Loader2, AlertCircle } from 'lucide-react';

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
    name: '',
    price: '',
    categoryId: '',
    description: ''
  });

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      setLoading(true);

      const [dishesRes, catsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/dishes"),
        axios.get("http://localhost:8000/api/categories")
      ]);

      setItems(dishesRes.data);
      setCategories(catsRes.data);

      // ✅ SAFE default category selection
      if (catsRes.data.length > 0) {
        setFormData(prev => ({
          ...prev,
          categoryId: prev.categoryId || String(catsRes.data[0].id)
        }));
      }

    } catch {
      setError("Failed to load data from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ❌ prevent empty categoryId (this was causing your error)
    if (!formData.categoryId) {
      setError("Please select a valid category.");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      setError("Invalid price.");
      return;
    }
    data.append('price', price.toFixed(2));

    // ✅ IMPORTANT: backend expects categoryId
    data.append('categoryId', formData.categoryId);

    data.append('description', formData.description || '');

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      if (editingItem) {
        await axios.post(
          `http://localhost:8000/api/dishes/${editingItem.id}?_method=PUT`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/dishes",
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      await fetchData();

      setIsModalOpen(false);
      setEditingItem(null);
      setSelectedFile(null);

    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to save dish.");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;

    await axios.delete(`http://localhost:8000/api/dishes/${id}`);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // ---------------- UI ----------------
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
        <div className="bg-red-100 text-red-600 p-3 mb-4 rounded flex gap-2">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="p-4 bg-white shadow flex justify-between">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>

                <p className="text-sm text-gray-500">
                  {categories.find(c => c.id === item.categoryId)?.name}
                </p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }}>
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <form onSubmit={handleSubmit} className="bg-white p-6 w-[400px] space-y-3">

            <input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2"
              required
            />

            <input
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="w-full border p-2"
              required
            />

            <select
              value={formData.categoryId}
              onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border p-2"
              required
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full border p-2"
            />

            <input
              type="file"
              onChange={e => setSelectedFile(e.target.files?.[0] || null)}
            />

            <button className="bg-blue-600 text-white w-full p-2">
              Save
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-2"
            >
              Cancel
            </button>

          </form>

        </div>
      )}

    </div>
  );
};

export default MenuManagement;