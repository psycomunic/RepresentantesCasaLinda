import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, Client } from '../types';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    selectedClient: Client | null;
    paymentTerm: string | null;
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    setClient: (client: Client | null) => void;
    setPaymentTerm: (term: string | null) => void;
    clearCart: () => void;
    cartTotals: {
        subtotal: number;
        discountAmount: number;
        totalAmount: number;
        totalItems: number;
    };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [paymentTerm, setPaymentTerm] = useState<string | null>(null);

    const calculateDiscountRate = (qty: number) => {
        if (qty >= 50) return 0.15;
        if (qty >= 20) return 0.10;
        if (qty >= 10) return 0.05;
        return 0;
    };

    const addItem = (product: Product, quantity: number) => {
        setItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
    };

    const setClient = (client: Client | null) => setSelectedClient(client);

    const clearCart = () => {
        setItems([]);
        setSelectedClient(null);
        setPaymentTerm(null);
    };

    const cartTotals = useMemo(() => {
        let subtotal = 0;
        let discountAmount = 0;
        let totalItems = 0;

        items.forEach(item => {
            const itemSubtotal = item.wholesale_price * item.quantity;
            const discountRate = calculateDiscountRate(item.quantity);

            subtotal += itemSubtotal;
            discountAmount += itemSubtotal * discountRate;
            totalItems += item.quantity;
        });

        return {
            subtotal,
            discountAmount,
            totalAmount: subtotal - discountAmount,
            totalItems
        };
    }, [items]);

    return (
        <CartContext.Provider value={{
            items,
            selectedClient,
            paymentTerm,
            addItem,
            removeItem,
            updateQuantity,
            setClient,
            setPaymentTerm,
            clearCart,
            cartTotals
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
