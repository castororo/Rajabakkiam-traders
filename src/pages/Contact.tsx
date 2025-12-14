import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS_INFO } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

import contactHeroBg from "@/assets/contact-hero-gen.png";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Sales / Orders",
      value: BUSINESS_INFO.phoneDisplay,
      href: `tel:${BUSINESS_INFO.phone}`,
    },
    {
      icon: Mail,
      label: "General Inquiries",
      value: BUSINESS_INFO.email,
      href: `mailto:${BUSINESS_INFO.email}`,
    },
    {
      icon: MapPin,
      label: "Our Address",
      value: BUSINESS_INFO.address,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: BUSINESS_INFO.hours,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section
        className="section-padding relative bg-cover bg-center min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${contactHeroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
        <div className="container-custom text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us & Place Your Order
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Reach out for inquiries, bulk orders, or to speak with our dedicated team.
            We're here to assist you.
          </p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="mt-1"
                    rows={5}
                  />
                </div>
                <Button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map & Quick Actions */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Find Us
              </h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
                <iframe
                  src={BUSINESS_INFO.googleMapsEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Raajabaackiam Traders location in Salem"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-4 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href={BUSINESS_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-lg font-medium hover:bg-gold-light transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
