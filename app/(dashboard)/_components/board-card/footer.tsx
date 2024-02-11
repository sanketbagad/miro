import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  isFavourite: boolean;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  title,
  isFavourite,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text=[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground text-[11px] truncate">
        {authorLabel} - {createdAtLabel}
      </p>
      <button disabled={disabled} onClick={onClick}
      className={cn("opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600", 
        disabled && "cursor-not-allowed opacity-75")}
      >
        <Star
        className={cn("h-4 w-4", isFavourite && "text-blue-600 fill-blue-600")}
        />
      </button>
    </div>
  );
};
