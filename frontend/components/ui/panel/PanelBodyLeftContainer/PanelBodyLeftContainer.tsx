"use client";

import PanelBodyLeftContainerCard from "./PanelBodyLeftContainerCard";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const PanelBodyLeftContainer = () => {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/history_diagnoses/info`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
      dedupingInterval: 300,
    }
  );
  if (isLoading || !data)
    return <p className="w-20 h-5 rounded-3xl bg-gray-200"></p>;

  const history_diagnoses_remove = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/history_diagnoses/remove`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <div
      className="p-2 pt-0 rounded-4xl bg-blue-50 flex items-center flex-col gap-2 overflow-auto h-full max-h-[550px] max-md:w-full w-[650px]"
      id="PanelBodyLeftContainer"
    >
      <div className="bg-blue-50/60 backdrop-blur-sm py-3 px-4 w-full sticky top-0 z-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
          </svg>
          <h3 className="text-[1rem] font-medium">
            تاریخچه تشخیص <span>«{data?.length}»</span>
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {/* <button className="bg-white/60 hover:scale-[0.90] transition-all size-10 flex items-center justify-center rounded-full" title="خروجی PDF">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-gray-800 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </button> */}
          <button
            onClick={history_diagnoses_remove}
            className="bg-white/60 hover:scale-[0.90] transition-all size-10 flex items-center justify-center rounded-full cursor-pointer"
            title="حذف تمام تاریخچه"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <PanelBodyLeftContainerCard />
    </div>
  );
};

export default PanelBodyLeftContainer;
