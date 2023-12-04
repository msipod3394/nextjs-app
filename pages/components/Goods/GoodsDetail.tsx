import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BookData } from "./Goods";

type Props = {
  item: BookData;
};

export const GoodsDetail: FC<Props> = () => {
  const router = useRouter();
  const { query } = router;

  // クエリパラメータを取得
  const id = Object.keys(query)
    .filter((key) => key !== "detail")
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  console.log(id);

  // idに一致したアイテムの情報を再取得
  const [book, setBook] = useState<BookData | null>(null);
  const url = `https://www.googleapis.com/books/v1/volumes?q=SPY%C3%97FAMILY?${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("ネットワークエラーです");
        }
        const data = await response.json();
        setBook(data.items[0] || null); // Assuming you want to display only the first item
      } catch (error) {
        // エラー時
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  console.log(book);

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.volumeInfo.title}</h1>
          <p>著者: {book.volumeInfo.authors.join(", ")}</p>
          <p>出版日: {book.volumeInfo.publishedDate}</p>
          <p>商品詳細: {book.volumeInfo.description}</p>
          <p>出版日: {book.saleInfo.buyLink}</p>
          {/* 他の詳細情報もここに追加 */}
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};
