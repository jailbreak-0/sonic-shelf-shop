import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/components/ProductGrid';
import { toast } from '@/hooks/use-toast';

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const newQuantity = existingItem.cartQuantity + 1;
        if (newQuantity > action.payload.quantity) {
          toast({
            title: "Stock Limit Reached",
            description: `Only ${action.payload.quantity} items available in stock.`,
            variant: "destructive",
          });
          return state;
        }
        
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, cartQuantity: newQuantity }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + 1,
          total: calculateTotal(updatedItems)
        };
      } else {
        const newItem: CartItem = { ...action.payload, cartQuantity: 1 };
        const updatedItems = [...state.items, newItem];
        
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + 1,
          total: calculateTotal(updatedItems)
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const removedItem = state.items.find(item => item.id === action.payload);
      
      return {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount - (removedItem?.cartQuantity || 0),
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const item = state.items.find(item => item.id === id);
      if (!item) return state;
      
      if (quantity > item.quantity) {
        toast({
          title: "Stock Limit Reached",
          description: `Only ${item.quantity} items available in stock.`,
          variant: "destructive",
        });
        return state;
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, cartQuantity: quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.cartQuantity, 0),
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };
    
    case 'LOAD_CART':
      return {
        items: action.payload,
        itemCount: action.payload.reduce((sum, item) => sum + item.cartQuantity, 0),
        total: calculateTotal(action.payload)
      };
    
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.total;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice
      }}
    >
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