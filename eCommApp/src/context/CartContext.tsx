import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    saleDiscount: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    setSaleDiscount: (discount: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
    initialCart?: CartItem[];
    initialDiscount?: number;
}

export const CartProvider: React.FC<CartProviderProps> = ({ 
    children, 
    initialCart = [], 
    initialDiscount = 0 
}) => {
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [saleDiscount, setSaleDiscountState] = useState<number>(initialDiscount);

    const addToCart = (product: Product) => {
        setCart(prevItems => {
            const itemInCart = prevItems.find(item => item.id === product.id);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const setSaleDiscount = (discount: number) => {
        // Expects a value between 0 and 1
        setSaleDiscountState(discount);
    };

    const contextValue: CartContextType = {
        cart,
        saleDiscount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setSaleDiscount,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
