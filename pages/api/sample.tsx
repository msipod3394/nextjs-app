import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  description: string;
  price: number;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method?.toLocaleLowerCase() !== "get") {
    return res.status(405).end();
  }
  res.status(200).json([
    {
      name: "焼肉",
      description: "ハラミが好きです",
      price: 3800,
    },
    {
      name: "ステーキ",
      description: "ミディアムが普通の焼き方です",
      price: 5000,
    },
    {
      name: "インドカレー",
      description: "サグ系にハマっています",
      price: 1400,
    },
  ]);
}
