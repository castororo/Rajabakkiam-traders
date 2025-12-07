import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">R</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-foreground leading-tight">
                  Rajabakkiam
                </h2>
                <p className="text-xs text-muted-foreground -mt-0.5">Traders</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quality rice & groceries in Salem. Free delivery up to 10 km. Trusted by families since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours & Delivery */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Delivery Info</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <strong className="text-foreground">Hours:</strong> {BUSINESS_INFO.hours}
            </p>
            <p className="text-sm text-muted-foreground">
              Free delivery up to 10 km. For orders beyond that, please call us.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Rajabakkiam Traders. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Call to order: {BUSINESS_INFO.phoneDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
}
