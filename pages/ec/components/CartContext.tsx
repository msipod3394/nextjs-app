import React, { createContext, useContext, useState } from "react";

// 商品情報の型
type CartItem = {
  id: string;
  volumeInfo: {
    title: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    buyLink: string;
  };
};

// カートの型
type CartContextValue = {
  itemCounter: number;
  cartItem: CartItem[];
  addToCart: (item: CartItem) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * CartContextProvider
 * - カートの状態を管理
 * - _appを通ったページで使えるように
 */
export const CartContextProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // カートにアイテムを追加
  const addToCart = (item: CartItem) => {
    // IDの重複チェック
    const isItemExist = cartItems.some((cartItem) => cartItem.id === item.id);

    if (!isItemExist) {
      setItemCount((prevCount) => prevCount + 1);
      setCartItems((prevItems) => [...prevItems, item]);
    } else {
      window.alert("商品は1つまでしか購入できません。");
    }
  };

  const contextValue = {
    itemCount,
    cartItems,
    addToCart,
  };

  console.log(cartItems);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    console.log("エラー");
  }
  return context;
};
