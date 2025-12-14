import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Check, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Image imports
import ricePonni from "@/assets/rice-ponni.jpg";
import riceBasmati from "@/assets/rice-basmati.jpg";
import riceBrown from "@/assets/rice-brown.jpg";
import riceBlack from "@/assets/rice-black.jpg";
import riceRed from "@/assets/rice-red.jpg";
import riceIdly from "@/assets/rice-idly.jpg";
import millets from "@/assets/millets.jpg";
import groceries from "@/assets/groceries.jpg";

// Brand imports
import malgovaMalligai from "@/assets/Malgova_malligai.jpeg";
import malgovaKichadi from "@/assets/Malkova_kichadi.jpeg";
import rettaikiliKolam from "@/assets/Rettaikili_Kolam.jpeg";
import rettaikiliPonni from "@/assets/Rettaikili_ponni.jpeg";

// Generated imports
import whitePonniGen from "@/assets/white-ponni-gen.png";
import bptPonniGen from "@/assets/bpt-ponni-gen.png";
import dlxPonniGen from "@/assets/dlx-ponni-gen.png";
import neiKichadiGen from "@/assets/nei-kichadi-gen.png";
import wheatFlourGen from "@/assets/wheat-flour-gen.png";
import edibleOilGen from "@/assets/edible-oil-gen.png";
import sugarGen from "@/assets/sugar-gen.png";
import cherryRiceGen from "@/assets/cherry-rice-gen.png";
import doubleDeerGen from "@/assets/double-deer-gen.png";
import royalBulletGen from "@/assets/royal-bullet-gen.png";

const imageMap: Record<string, string> = {
  "rice-ponni": ricePonni,
  "rice-basmati": riceBasmati,
  "rice-brown": riceBrown,
  "rice-black": riceBlack,
  "rice-red": riceRed,
  "rice-idly": riceIdly,
  "millets": millets,
  "groceries": groceries,
  "malgova-malligai": malgovaMalligai,
  "malgova-kichadi": malgovaKichadi,
  "rettaikili-kolam": rettaikiliKolam,
  "rettaikili-ponni": rettaikiliPonni,
  "white-ponni": whitePonniGen,
  "bpt-ponni": bptPonniGen,
  "dlx-ponni": dlxPonniGen,
  "nei-kichadi": neiKichadiGen,
  "wheat-flour": wheatFlourGen,
  "edible-oil": edibleOilGen,
  "sugar": sugarGen,
  "cherry-brand": cherryRiceGen,
  "double-deer": doubleDeerGen,
  "royal-bullet": royalBulletGen,
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


export function ProductCard({ product }: { product: Product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.packSizes[0]);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const imageSrc = imageMap[product.image] || ricePonni;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="card-product group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-muted">
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
          <h3 className="font-serif text-base font-semibold text-foreground">
            {product.name}
          </h3>
          {product.tamilName && (
            <p className="text-sm text-primary">{product.tamilName}</p>
          )}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">Size:</span>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="h-7 w-[90px] text-xs">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {product.packSizes.map((size) => (
                  <SelectItem key={size} value={size} className="text-xs">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAddToCart}
            className={`w-full text-xs h-8 transition-all duration-300 ${isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "btn-primary"}`}
            disabled={isAdded}
          >
            {isAdded ? (
              <span className="flex items-center gap-1.5 transition-all animate-in fade-in zoom-in">
                <Check className="w-3.5 h-3.5" /> Added
              </span>
            ) : (
              <span className="flex items-center gap-1.5 transition-all animate-in fade-in zoom-in">
                <Plus className="w-3.5 h-3.5" /> Add to Cart
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
