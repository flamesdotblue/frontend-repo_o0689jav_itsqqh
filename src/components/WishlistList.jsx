import WishlistItemCard from "./WishlistItemCard";

export default function WishlistList({ items, onContribute, onRemove }) {
  if (!items.length) {
    return (
      <div className="text-center py-16 rounded-2xl border border-dashed border-gray-300 bg-white">
        <p className="text-lg font-medium text-gray-700">Your wishlist is empty</p>
        <p className="text-sm text-gray-500 mt-1">Add your first item above to start pooling contributions.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <WishlistItemCard
          key={item.id}
          item={item}
          onContribute={onContribute}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
