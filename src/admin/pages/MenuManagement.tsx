import React, { useState, useRef, useEffect } from "react";
import { Plus, Edit3, Trash2, Upload, X, ImageIcon } from "lucide-react";
// Assuming MenuItem is in your types file, make sure to add: isAvailable: boolean;
import { MenuItem } from "../types";

const MenuManagement: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Grilled Salmon Bowl",
      price: 18.5,
      category: "Main",
      description:
        "Fresh Atlantic salmon served with quinoa and seasonal vegetables.",
      image: "",
      isAvailable: true, // New default state
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Main",
    description: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        price: editingItem.price.toString(),
        category: editingItem.category,
        description: editingItem.description || "",
      });
    } else {
      setFormData({ name: "", price: "", category: "Main", description: "" });
      setSelectedFile(null);
    }
  }, [editingItem, isModalOpen]);

  // --- NEW: TOGGLE FUNCTION ---
  const handleToggleAvailability = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item,
      ),
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this dish?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: selectedFile
        ? URL.createObjectURL(selectedFile)
        : editingItem?.image || "",
      isAvailable: editingItem ? editingItem.isAvailable : true, // Preserve or default to true
    };

    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id ? { ...item, ...itemData } : item,
        ),
      );
    } else {
      setItems([...items, { id: Date.now(), ...itemData }]);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic text-slate-800 ">
            Menu Management
          </h1>
          <p className="text-slate-600 font-medium text-sm">
            Manage your dishes and descriptions.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#034A6C] text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all"
        >
          <Plus size={20} /> Add Dish
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-[2.5rem] border transition-all flex items-center justify-between group shadow-sm ${
              item.isAvailable
                ? "bg-white border-slate-100 hover:shadow-md"
                : "bg-slate-50 border-dashed border-slate-200 opacity-70"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="size-24 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={32} className="text-slate-300" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#034A6C] bg-blue-50 px-2 py-1 rounded-lg">
                    {item.category}
                  </span>
                  {!item.isAvailable && (
                    <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">
                      Hidden
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-xl mt-1">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-1 max-w-md mb-1">
                  {item.description}
                </p>
                <p className="text-[#034A6C] font-black">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* --- NEW: TOGGLE SWITCH --- */}
              <div className="flex flex-col items-center gap-1 mr-4">
                <button
                  onClick={() => handleToggleAvailability(item.id)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 flex items-center ${
                    item.isAvailable ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`size-4 bg-white rounded-full shadow-sm transition-transform duration-200 transform ${
                      item.isAvailable ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">
                  {item.isAvailable ? "Visible" : "Hidden"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsModalOpen(true);
                  }}
                  className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {editingItem ? "Edit Dish" : "Add Dish"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-xl px-3 py-2"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Price</label>
                <input
                  type="number"
                  className="w-full border rounded-xl px-3 py-2"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Category</label>
                <select
                  className="w-full border rounded-xl px-3 py-2"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="Main">Main</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border rounded-xl px-3 py-2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Image (optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200"
                  >
                    <Upload size={16} />
                    {selectedFile
                      ? selectedFile.name
                      : editingItem?.image
                        ? "Change Image"
                        : "Upload Image"}
                  </button>
                  {(selectedFile || editingItem?.image) && (
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#034A6C] text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all"
                >
                  {editingItem ? "Save Changes" : "Add Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
