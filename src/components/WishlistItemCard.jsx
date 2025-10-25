import { useState } from "react";
import { ExternalLink, Trash2, Coins } from "lucide-react";

export default function WishlistItemCard({ item, onContribute, onRemove }) {
  const [amount, setAmount] = useState("");
  const remaining = Math.max(item.target - item.contributed, 0);
  const progress = Math.min((item.contributed / item.target) * 100, 100);

  const contribute = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;
    onContribute(item.id, value);
    setAmount("");
  };

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      {item.image ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-50">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.style.display='none';}} />
        </div>
      ) : null}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
            {item.note ? (
              <p className="text-sm text-gray-600 mt-1">{item.note}</p>
            ) : null}
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-600 p-2 -m-2 rounded-lg hover:bg-red-50"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">${item.contributed.toFixed(2)} / ${item.target.toFixed(2)}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">${remaining.toFixed(2)} remaining</div>
        </div>

        <form onSubmit={contribute} className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="25.00"
              className="w-full rounded-xl border-gray-300 pl-7 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 sm:px-4 py-2 text-white font-medium shadow-sm hover:bg-violet-700"
          >
            <Coins size={16} /> Contribute
          </button>
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700"
            >
              View <ExternalLink size={14} />
            </a>
          ) : null}
        </form>
      </div>
    </div>
  );
}
