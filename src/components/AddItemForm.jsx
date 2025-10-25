import { useState } from "react";
import { Plus, Link as LinkIcon, Image as ImageIcon, StickyNote } from "lucide-react";

export default function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!title || isNaN(value) || value <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      target: value,
      contributed: 0,
      link: link.trim() || null,
      image: image.trim() || null,
      note: note.trim() || null,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setAmount("");
    setLink("");
    setImage("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Noise-cancelling headphones"
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="150.00"
              className="w-full rounded-xl border-gray-300 pl-7 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><LinkIcon size={16} /> Link (optional)</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com/product"
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><ImageIcon size={16} /> Image URL (optional)</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><StickyNote size={16} /> Note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a short note about why you love this item..."
            rows={3}
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 px-4 py-2 text-white font-medium shadow-sm hover:shadow transition"
        >
          <Plus size={16} /> Add to wishlist
        </button>
      </div>
    </form>
  );
}
