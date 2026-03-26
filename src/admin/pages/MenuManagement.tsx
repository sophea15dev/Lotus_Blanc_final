import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileText, Edit3, Trash2, Upload, X, ImageIcon } from 'lucide-react';
import { MenuItem } from '../types';

const MenuManagement: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([
    { id: 1, name: 'Grilled Salmon Bowl', price: 18.5, category: 'Main', description: 'Fresh Atlantic salmon served with quinoa and seasonal vegetables.', image: '' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Expanded Form State
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    category: 'Main', 
    description: '' 
  });

  // Sync form with editing item
  useEffect(() => {
    if (editingItem) {
      setFormData({ 
        name: editingItem.name, 
        price: editingItem.price.toString(), 
        category: editingItem.category,
        description: editingItem.description || ''
      });
    } else {
      setFormData({ name: '', price: '', category: 'Main', description: '' });
      setSelectedFile(null);
    }
  }, [editingItem, isModalOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this dish?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: selectedFile ? URL.createObjectURL(selectedFile) : (editingItem?.image || '')
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...itemData } : item));
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
          <h1 className="text-3xl font-black italic text-slate-800 ">Menu Designer</h1>
          <p className="text-slate-600 font-medium text-sm">Manage your dishes and descriptions.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-[#034A6C] text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all"
        >
          <Plus size={20} /> Add Dish
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-6">
              <div className="size-24 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center overflow-hidden">
                {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-slate-300" />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#034A6C] bg-blue-50 px-2 py-1 rounded-lg">{item.category}</span>
                <h3 className="font-bold text-slate-800 text-xl mt-1">{item.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-1 max-w-md mb-1">{item.description}</p>
                <p className="text-[#034A6C] font-black">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"><Edit3 size={20}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic text-slate-800">{editingItem ? 'Edit Dish' : 'New Dish'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-50 p-2 rounded-full text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* IMAGE UPLOAD */}
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all">
                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                <Upload size={24} className="text-[#034A6C]" />
                <p className="font-bold text-sm text-slate-700">{selectedFile ? selectedFile.name : "Upload Dish Image"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none appearance-none">
                    <option>Main</option>
                    <option>Appetizer</option>
                    <option>Dessert</option>
                    <option>Drinks</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Price ($)</label>
                <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                  placeholder="Tell customers about the ingredients and flavor..."
                />
              </div>

              <button type="submit" className="w-full bg-[#034A6C] text-white py-5 rounded-[1.5rem] font-black italic shadow-xl hover:opacity-90 transition-all">
                {editingItem ? 'Update Menu Item' : 'Add to Menu'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;