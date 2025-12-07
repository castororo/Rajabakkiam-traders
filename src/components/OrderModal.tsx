
import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUSINESS_INFO, RICE_PRODUCTS, GROCERY_PRODUCTS, PREMIUM_BRANDS } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const UNITS = ["kg", "bags", "packet", "liter", "box"];

export function OrderModal({ isOpen, onClose, productName = "" }: OrderModalProps) {
  const { toast } = useToast();

  // Combine all products for the dropdown
  const allProducts = [...RICE_PRODUCTS, ...GROCERY_PRODUCTS, ...PREMIUM_BRANDS];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    product: "",
    quantityValue: "",
    quantityUnit: "kg",
    deliveryDate: "",
    notes: "",
  });

  // Update product when prop changes
  useEffect(() => {
    if (isOpen && productName) {
      setFormData(prev => ({ ...prev, product: productName }));
    }
  }, [isOpen, productName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.address) {
      toast({
        title: "Address Required",
        description: "Please provide your delivery address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.product) {
      toast({
        title: "Product Required",
        description: "Please select a product to order.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.quantityValue) {
      toast({
        title: "Quantity Required",
        description: "Please specify the quantity you need.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.deliveryDate) {
      toast({
        title: "Date Required",
        description: "Please pick a preferred delivery date.",
        variant: "destructive",
      });
      return;
    }

    // Find full product details for better message
    const selectedProductDetails = allProducts.find(p => p.name === formData.product);
    const productDisplay = selectedProductDetails
      ? `${selectedProductDetails.name} ${selectedProductDetails.tamilName ? `(${selectedProductDetails.tamilName})` : ""} `
      : formData.product;

    const quantityDisplay = `${formData.quantityValue} ${formData.quantityUnit} `;

    const message = `Hi, I'd like to order:\n\nName: ${formData.name}\nProduct: ${productDisplay}\nQuantity: ${quantityDisplay}\nAddress: ${formData.address}\nDelivery Date: ${formData.deliveryDate}\nNotes: ${formData.notes}`;

    toast({
      title: "Opening WhatsApp...",
      description: "Please send the pre-filled message to confirm your order.",
    });

    window.open(`${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(message)}`, "_blank");

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      product: "",
      quantityValue: "",
      quantityUnit: "kg",
      deliveryDate: "",
      notes: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={resetForm}
      />

      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up">
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Place Your Order
          </h2>
          <p className="text-muted-foreground mb-6">
            Fill in your details and send via WhatsApp to confirm.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street, Area, Salem"
                className="mt-1"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="product">Product *</Label>
                <Select
                  value={formData.product}
                  onValueChange={(value) => setFormData({ ...formData, product: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {allProducts.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="quantity"
                    required
                    value={formData.quantityValue}
                    onChange={(e) => setFormData({ ...formData, quantityValue: e.target.value })}
                    placeholder="e.g., 5"
                    className="flex-1"
                  />
                  <Select
                    value={formData.quantityUnit}
                    onValueChange={(value) => setFormData({ ...formData, quantityUnit: value })}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="deliveryDate">Preferred Delivery Date *</Label>
              <Input
                id="deliveryDate"
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes">Special Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special instructions..."
                className="mt-1"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full btn-primary gap-2">
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Or call directly:{" "}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-primary hover:underline">
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

