import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
    id: string; // unique id for cart item (product.id + size)
    productId: string;
    name: string;
    tamilName?: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, size: string) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, newQuantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("raajabaackiam-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("raajabaackiam-cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: any, size: string) => {
        const cartItemId = `${product.id}-${size}`;

        setItems((prev) => {
            const existing = prev.find((item) => item.id === cartItemId);
            if (existing) {
                toast({
                    title: "Updated Cart",
                    description: `Increased quantity for ${product.name} (${size})`,
                });
                return prev.map((item) =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            toast({
                title: "Added to Cart",
                description: `${product.name} (${size}) added to your cart`,
            });

            return [
                ...prev,
                {
                    id: cartItemId,
                    productId: product.id,
                    name: product.name,
                    tamilName: product.tamilName,
                    size,
                    quantity: 1,
                },
            ];
        });
        setIsOpen(true);
    };

    const removeFromCart = (cartItemId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(cartItemId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
