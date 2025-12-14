import { useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { OrderModal } from "@/components/OrderModal";
import { RICE_PRODUCTS, GROCERY_PRODUCTS, PREMIUM_BRANDS } from "@/lib/data";
import { Input } from "@/components/ui/input";

import heroImage from "@/assets/hero-rice.jpg";

const Products = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "rice" | "grocery" | "premium-brand">("all");

  const handleOrder = (productName: string) => {
    setSelectedProduct(productName);
    setOrderModalOpen(true);
  };

  const allProducts = [...RICE_PRODUCTS, ...GROCERY_PRODUCTS, ...PREMIUM_BRANDS];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tamilName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Rice varieties at Raajabaackiam Traders"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete range of premium rice varieties and grocery staples
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "All" },
                { key: "rice", label: "Rice" },
                { key: "premium-brand", label: "Premium Brands" },
                { key: "grocery", label: "Grocery" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key as typeof activeCategory)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rice Products */}
          {(activeCategory === "all" || activeCategory === "rice") && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Rice Varieties
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts
                  .filter((p) => p.category === "rice")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrder={handleOrder}
                    />
                  ))}
              </div>
              <p className="text-center text-muted-foreground mt-6 text-sm">
                மற்றும் பல / and more varieties available
              </p>
            </div>
          )}

          {/* Premium Brands */}
          {(activeCategory === "all" || activeCategory === "premium-brand") && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Premium Brands
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts
                  .filter((p) => p.category === "premium-brand")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrder={handleOrder}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Grocery Products */}
          {(activeCategory === "all" || activeCategory === "grocery") && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Grocery Staples
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts
                  .filter((p) => p.category === "grocery")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrder={handleOrder}
                    />
                  ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        productName={selectedProduct}
      />
    </Layout>
  );
};

export default Products;
