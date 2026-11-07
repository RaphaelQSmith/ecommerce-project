import { StarIcon } from "@/components/ui/icons";

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const rounded = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${reviewCount} reviews`}
    >
      <div className="flex text-amber-500" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon key={n} width={14} height={14} filled={n <= rounded} />
        ))}
      </div>
      <span className="text-xs text-slate-600" aria-hidden="true">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}
