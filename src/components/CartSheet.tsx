import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingCart, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BUSINESS_INFO } from "@/lib/data";
import { toast } from "sonner"; // Using sonner directly for cleaner alerts

export function CartSheet() {
    const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, totalItems } = useCart();
    const [address, setAddress] = useState("");

    const handleCheckout = () => {
        if (items.length === 0) return;

        if (!address.trim()) {
            toast.error("Please enter your delivery address to proceed.");
            return;
        }

        let message = "Hello Raajabaackiam Traders, I would like to place an order:\n\n";
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} ${item.tamilName ? `(${item.tamilName})` : ""} - ${item.size} x ${item.quantity}\n`;
        });

        message += `\nDelivery Address:\n${address}`;
        message += "\n\nPlease confirm availability and total price.";

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = BUSINESS_INFO.phone.replace(/[^0-9]/g, "");
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full overflow-hidden">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Shopping Cart ({totalItems})
                    </SheetTitle>
                    <SheetDescription>
                        Review your items and checkout via WhatsApp.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 my-4 pr-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-semibold text-sm">{item.name}</h4>
                                            {item.tamilName && (
                                                <p className="text-xs text-muted-foreground">{item.tamilName}</p>
                                            )}
                                            <span className="text-xs font-medium px-2 py-0.5 bg-background rounded border">
                                                {item.size}
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-destructive hover:text-destructive/90"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-4 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    {items.length > 0 && (
                        <div className="bg-background pt-2 pb-4 space-y-3 border-t">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Delivery Address <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="address"
                                    placeholder="Enter your full delivery address..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="resize-none min-h-[80px] bg-muted/30"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <SheetFooter className="mt-auto pt-2">
                    <Button
                        className="w-full btn-primary py-6 text-lg"
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                    >
                        Checkout on WhatsApp
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
