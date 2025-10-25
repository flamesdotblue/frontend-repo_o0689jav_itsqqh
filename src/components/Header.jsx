import { Gift, Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-pink-500 to-violet-500 text-white">
            <Gift size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">WishPool</h1>
            <p className="text-xs text-gray-500 -mt-1">Group gifting made simple</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <Heart size={16} className="text-pink-500" />
          <span>Birthdays • Ceremonies • Milestones</span>
        </div>
      </div>
    </header>
  );
}
