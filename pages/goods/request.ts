import { requestGet } from "../../request/request";
import { BookData } from "./index.page";

type ResponseBooks = {
  items: BookData[];
  kind: string;
  totalItems: number;
};

export const fetchBooks = async (path: string): Promise<BookData[]> => {
  const res = await requestGet<ResponseBooks>({
    url: path,
  });

  return res.data.items;
};
