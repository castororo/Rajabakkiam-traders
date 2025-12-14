import { Link } from "react-router-dom";
import { Heart, Award, Leaf, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Uncompromising Quality",
      description: "From farm to fork, we ensure every grain meets the highest standards of purity and taste.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We honor the trust our customers place in us through friendly and personalized service.",
    },
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description: "We partner with farmers who practice sustainable agriculture to protect our planet.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="Hands holding premium rice grains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            A Legacy of Quality, <br className="hidden md:block" />
            <span className="text-primary">A Future of Trust</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the story behind every grain. From our family to your family table.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Our Journey From Field to Table
            </h2>
            <div className="prose prose-invert mx-auto">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded with a passion for bringing the world's finest rice to your kitchen,
                Raajabaackiam Traders has grown from a small family venture into a trusted name
                for households across Salem, Tamil Nadu.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We partner with trusted brands like <strong className="text-foreground">CHERRY</strong> (Kangayam),
                <strong className="text-foreground"> RETTAIKILI</strong> (Salem),
                <strong className="text-foreground"> MALGOVA</strong> (Kangayam),
                <strong className="text-foreground"> India Gate</strong>, and more to bring you
                the finest rice varieties for every occasion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our promise is simple: quality products at fair prices, delivered with friendly
                service and a personal touch that only a local trader can provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Story
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Experience the difference that passion and heritage make. Explore our collection
            and bring the taste of quality to your table.
          </p>
          <Button asChild className="btn-primary text-base px-8 py-6">
            <Link to="/products">
              Explore Our Collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
