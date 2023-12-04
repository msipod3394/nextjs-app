import Image from "next/image";
import React, { useEffect, useState } from "react";

// 取得したJSONデータの型定義
type BookData = {
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

export const APITest = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const url = "https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("ネットワークエラーです");
        }
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        // エラー時
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(books);

  return (
    <div>
      <ul>
        
        {books.map(({ id, volumeInfo, saleInfo }) => (
          <li key={id}>
            <p>{volumeInfo.title}</p>
            <p>{volumeInfo.publishedDate.replace(/-/g, "/")}</p>
            <p>{volumeInfo.description}</p>
            <Image
              src={volumeInfo.imageLinks.thumbnail}
              alt={volumeInfo.title}
              width={100}
              height={100}
            />
            <a href={saleInfo.buyLink} target="_blank">
              詳しくはこちら
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
