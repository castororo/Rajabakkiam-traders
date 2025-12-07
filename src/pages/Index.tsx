import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Award, Zap, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { BenefitCard } from "@/components/BenefitCard";
import { ProductCard } from "@/components/ProductCard";
import { OrderModal } from "@/components/OrderModal";
import { BUSINESS_INFO, RICE_PRODUCTS, PREMIUM_BRANDS, BENEFITS } from "@/lib/data";

import heroImage from "@/assets/hero-rice.jpg";

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
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium rice grains from Rajabakkiam Traders"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up">
              Fresh rice & groceries for Salem —{" "}
              <span className="text-primary">trusted since day one</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 opacity-0 animate-fade-up stagger-1">
              Superb fine quality rice, friendly service, and free delivery up to 10 km.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-fade-up stagger-2">
              <Button onClick={() => handleOrder()} className="btn-primary text-base px-8 py-6">
                Place an Order
              </Button>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 btn-secondary text-base px-8 py-6"
              >
                <Phone className="w-5 h-5" />
                Call {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground opacity-0 animate-fade-up stagger-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Free delivery up to 10 km
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Reasonable price
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick response
              </div>
            </div>
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
