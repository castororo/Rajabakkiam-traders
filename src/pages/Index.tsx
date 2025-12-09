import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Award, Zap, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { BenefitCard } from "@/components/BenefitCard";
import { ProductCard } from "@/components/ProductCard";
import { OrderModal } from "@/components/OrderModal";
import { BUSINESS_INFO, RICE_PRODUCTS, PREMIUM_BRANDS, BENEFITS } from "@/lib/data";


import heroDark from "@/assets/rice_paddy1.png";
import heroLight from "@/assets/hero-light.png";

const Index = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleOrder = (productName: string = "") => {
    setSelectedProduct(productName);
    setOrderModalOpen(true);
  };

  const featuredProducts = RICE_PRODUCTS.slice(0, 4);
  const featuredBrands = PREMIUM_BRANDS.slice(0, 6);

  return (
    <Layout>
      {/* at top of file (near other imports) */}


      {/* Hero Section (light + dark modes; DOES NOT change text content) */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden
                    bg-[#F5F5F5] dark:bg-transparent">

        {/* ---------- LIGHT MODE IMAGE (visible in light mode only) ---------- */}
        <img
          src={heroLight}
          alt="Rice background (light)"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.02] contrast-[0.95] block dark:hidden"
          aria-hidden="true"
        />

        {/* light-mode warm overlay (visible only when NOT dark) */}
        {/* <div
          className="absolute inset-0 pointer-events-none block dark:hidden"
          style={{
            background:
              "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.62) 0%, rgba(245,240,235,0.9) 45%, rgba(245,240,235,1) 100%)"
          }}
          aria-hidden="true"
        /> */}

        {/* subtle vignette for light mode */}
        <div
          className="absolute inset-0 pointer-events-none block dark:hidden"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.02) 55%, rgba(0,0,0,0.06) 100%)"
          }}
          aria-hidden="true"
        />

        {/* ---------- DARK MODE IMAGE + OVERLAY (unchanged behavior) ---------- */}
        <img
          src={heroDark}
          alt="Rice background (dark)"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.65] hidden dark:block"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.78) 65%, rgba(0,0,0,0.92) 100%)"
          }}
          aria-hidden="true"
        />

        {/* ---------- OPTIONAL FALLING PADDY (place between overlays and content) ----------
      If you already use paddy spans for dark mode, keep them under the dark-only layer.
      For light-mode flavor I added light paddy spans (comment/uncomment as needed).
  */}

        {/* Light paddy decorations (comment out if not needed) */}
        {/* <span className="paddy paddy--light paddy--delay-1" style={{ left: "12%", top: "-6%" }} />
  <span className="paddy paddy--light paddy--delay-2" style={{ left: "36%", top: "-8%" }} />
  <span className="paddy paddy--light paddy--delay-3" style={{ left: "62%", top: "-9%" }} />
  <span className="paddy paddy--light paddy--delay-4" style={{ left: "80%", top: "-5%" }} /> */}

        {/* Keep any dark paddy spans where they were (hidden when light). Example: */}
        {/* <span className="paddy paddy--delay-1 hidden dark:block" style={{ left:"15%", top:"-8%" }} /> */}

        {/* ---------- CONTENT: TEXT & BUTTON (UNCHANGED) ---------- */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20">
          {/* keep your exact heading / paragraph / buttons (do not alter text) */}
          <h1 className="text-[rgb(23,23,23)] dark:text-white font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            Fresh rice & Groceries for Salem — Trusted since day one
          </h1>

          <p className="mt-4 text-[rgb(64,64,64)] dark:text-yellow-50/85 text-lg md:text-xl max-w-2xl mx-auto">
            Experience the world's finest grains, cultivated with tradition and passion.
            Each harvest tells a story of heritage and dedication.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Button text is kept exactly; only visual updated for both themes */}
            <button
              onClick={() => handleOrder()}
              className="px-6 py-3 rounded-full font-semibold text-base shadow transition-transform active:scale-95"
              style={{
                background: "linear-gradient(180deg,#FFF1D6 0%, #FFDFA8 100%)",
                color: "#2b1a00",
                boxShadow: "0 6px 20px rgba(223,164,55,0.12)",
                border: "1px solid rgba(34,20,6,0.06)"
              }}
            >
              Explore Our Collection
            </button>
          </div>
        </div>
      </section>



      {/* Benefits Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take pride in delivering quality products with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Discover Our Premium Rice
              </h2>
              <p className="text-muted-foreground">
                From everyday ponni to exotic varieties
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-medium"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={handleOrder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Our Trademark Rice Brands
              </h2>
              <p className="text-muted-foreground">
                Trusted brands for quality you can count on
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-medium"
            >
              View all brands
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBrands.map((brand) => (
              <ProductCard key={brand.id} product={brand} onOrder={handleOrder} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Call us or place your order online. We'll deliver fresh rice and groceries to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => handleOrder()} className="btn-primary text-base px-8 py-6">
              Place an Order
            </Button>
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-6 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
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

export default Index;
