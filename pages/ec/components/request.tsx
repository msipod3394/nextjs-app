import { requestGet } from "../../../request/request";
import { getData } from "../index.page";

type ResponseData = {
  items: getData[];
  kind: string;
  totalItems: number;
};

export const fetchData = async (path: string): Promise<getData[]> => {
  const res = await requestGet<ResponseData>({
    url: path,
  });

  return res.data.items;
};
