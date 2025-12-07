import { useState } from "react";
import { Button } from "@/components/ui/button";

// Image imports
import ricePonni from "@/assets/rice-ponni.jpg";
import riceBasmati from "@/assets/rice-basmati.jpg";
import riceBrown from "@/assets/rice-brown.jpg";
import riceBlack from "@/assets/rice-black.jpg";
import riceRed from "@/assets/rice-red.jpg";
import riceIdly from "@/assets/rice-idly.jpg";
import millets from "@/assets/millets.jpg";
import groceries from "@/assets/groceries.jpg";

const imageMap: Record<string, string> = {
  "rice-ponni": ricePonni,
  "rice-basmati": riceBasmati,
  "rice-brown": riceBrown,
  "rice-black": riceBlack,
  "rice-red": riceRed,
  "rice-idly": riceIdly,
  "millets": millets,
  "groceries": groceries,
};

interface Product {
  id: string;
  name: string;
  tamilName?: string;
  description: string;
  packSizes: string[];
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onOrder: (productName: string) => void;
}

export function ProductCard({ product, onOrder }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = imageMap[product.image] || ricePonni;

  return (
    <div className="card-product group">
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={imageSrc}
          alt={`${product.name} - ${product.tamilName || ""}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {product.name}
          </h3>
          {product.tamilName && (
            <p className="text-sm text-primary">{product.tamilName}</p>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.packSizes.map((size) => (
            <span
              key={size}
              className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {size}
            </span>
          ))}
        </div>
        <Button
          onClick={() => onOrder(product.name)}
          className="w-full btn-primary text-sm py-2"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
}
