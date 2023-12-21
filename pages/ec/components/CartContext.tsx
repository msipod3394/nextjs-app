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
  // カート内のアイテム数管理
  const [itemCount, setItemCount] = useState(0);
  // カート内のアイテム管理
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

  // useCartContext実行後に呼び出せる
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

// カート情報にアクセス
export const useCartContext = () => {
  const cartData = useContext(CartContext);

  if (!cartData) {
    console.log("エラー");
  }
  return cartData;
};
