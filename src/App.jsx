import { useMemo, useState } from "react";
import Header from "./components/Header";
import AddItemForm from "./components/AddItemForm";
import WishlistList from "./components/WishlistList";
import { PartyPopper } from "lucide-react";

export default function App() {
  const [items, setItems] = useState(() => {
    // Seed with a couple of example items for a nice first impression
    return [
      {
        id: crypto.randomUUID(),
        title: "Espresso Machine",
        target: 320,
        contributed: 120,
        link: "https://example.com/espresso",
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop",
        note: "For cozy mornings and latte art attempts",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Weekend Getaway Fund",
        target: 500,
        contributed: 75,
        link: null,
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        note: "A little escape to celebrate together",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const totals = useMemo(() => {
    const raised = items.reduce((sum, i) => sum + i.contributed, 0);
    const goal = items.reduce((sum, i) => sum + i.target, 0);
    const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
    return { raised, goal, progress };
  }, [items]);

  const addItem = (data) => {
    setItems((prev) => [data, ...prev]);
  };

  const contributeToItem = (id, amount) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, contributed: Math.min(it.contributed + amount, it.target) }
          : it
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
              <PartyPopper size={16} /> Plan your celebration wishlist
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Pool contributions for the things you love
            </h2>
            <p className="mt-2 text-gray-600">
              Create a list for birthdays, weddings, graduations, or any special
              moment. Friends and family can chip in toward each item.
            </p>
          </div>
          <div className="w-full sm:w-auto min-w-[260px] bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-gray-600">Total Progress</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              ${totals.raised.toFixed(2)}
              <span className="text-gray-400 text-base font-normal"> / ${totals.goal.toFixed(2)}</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-pink-500"
                style={{ width: `${totals.progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <AddItemForm onAdd={addItem} />
        </section>

        <section className="mt-8">
          <WishlistList
            items={items}
            onContribute={contributeToItem}
            onRemove={removeItem}
          />
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        Built for joyful giving. Your data will persist once backend is connected.
      </footer>
    </div>
  );
}
