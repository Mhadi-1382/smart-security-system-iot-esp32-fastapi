"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async <T,>(url: string): Promise<T> => fetch(url).then((r) => r.json() as Promise<T>);

type HistoryItem = {
  image_url: string;
  timestamp: string;
};
type ApiResponse = {
  history_diagnoses: HistoryItem[];
};

const PanelBodyLeftContainerCard = () => {
  const { data, error, isLoading } = useSWR<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/history_diagnoses/info`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
      dedupingInterval: 300,
    },
  );

  if (error) return <p className="text-red-500 text-sm">خطا رخ داده</p>;
  if (isLoading || !data) return <p className="w-20 h-10 rounded-3xl bg-gray-200"></p>;

  const items = data.history_diagnoses ?? [];

  if (items.length === 0) return <p className="text-gray-500 text-sm">موردی پیدا نشد.</p>;

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((card: HistoryItem, i: number) => (
        <div
          className="p-2 bg-white rounded-4xl flex items-center flex-col gap-2 text-center w-full shadow-md"
          key={i}
        >
          <Link
            href={`${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/${card.image_url}`}
            className="w-full"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/${card.image_url}`}
              alt=""
              width={500}
              height={150}
              priority
              className="rounded-4xl object-cover w-full"
            />
            <p className="text-sm text-gray-500 mx-2 mt-2" dir="auto">
              {card.timestamp}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PanelBodyLeftContainerCard;
