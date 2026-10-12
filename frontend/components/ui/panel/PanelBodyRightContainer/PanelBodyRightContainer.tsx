"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const PanelBodyRightContainer = () => {
  const [active_, setActive_] = useState(false);
  const toggle_ = async () => {
    const nextState_ = !active_;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/device/alarm?status=${nextState_}`,
      {
        method: "POST",
      }
    );

    setActive_(nextState_);
  };

  const [active__, setActive__] = useState(true);
  const toggle__ = async () => {
    const nextState__ = !active__;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/device/mode?status=${nextState__}`,
      {
        method: "POST",
      }
    );

    setActive__(nextState__);
  };

  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_PROTOCOL}${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}/user/info`, fetcher);
  if (isLoading || !data) return <p className="w-20 h-5 rounded-3xl bg-gray-200"></p>;

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center gap-2 bg-green-100 rounded-4xl p-2">
        <Link href={`${process.env.NEXT_PUBLIC_VIDEO_API}`} target="_blank" className="cursor-pointer flex items-center gap-2 m-2 py-2 px-3 text-gray-600 text-sm rounded-full hover:bg-green-50 hover:scale-[0.98] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span>پخش زنده</span>
        </Link>

        <div className="flex items-center gap-2 m-2 text-gray-600 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
            />
          </svg>
          <p>
            وضعیت سیستم: <span>{active__ ? "فعال" : "غیرفعال"}</span>
          </p>
        </div>
      </div>

      <div className="flex max-[850px]:flex-wrap gap-6 w-full">
        <div
          className="flex md:flex-wrap flex-1 gap-2.5 max-md:overflow-auto"
          id="PanelBodyRightContainerCard"
        >
          <div
            className="bg-white text-gray-600 text-sm font-medium rounded-4xl flex flex-col gap-3 w-40 hover:scale-[0.98] cursor-pointer transition-all"
            onClick={toggle_}
          >
            {active_ ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-12 p-3 bg-[#eafc5e] rounded-full flex items-center justify-center m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-12 p-3 bg-[#eafc5e] rounded-full flex items-center justify-center m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            )}
            <p className="p-4 pt-0">
              {active_ ? "غیرفعال‌سازی آژیر" : "فعال‌سازی آژیر"}
            </p>
          </div>
          <div
            className="bg-white text-gray-600 text-sm font-medium rounded-4xl flex flex-col gap-3 w-40 hover:scale-[0.98] cursor-pointer transition-all"
            onClick={toggle__}
          >
            {active__ ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 p-3 bg-[#eafc5e] rounded-full flex items-center justify-center m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-12 p-3 bg-[#eafc5e] rounded-full flex items-center justify-center m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            )}
            <p className="p-4 pt-0">
              {active__ ? "غیرفعال‌سازی سیستم" : "فعال‌سازی سیستم"}
            </p>
          </div>
        </div>
        {/* <div className="flex flex-auto gap-2.5 w-full">
          <div className="bg-orange-100 text-gray-600 font-medium p-4 rounded-4xl flex flex-col gap-5 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 p-3 bg-[#eafc5e] rounded-full flex items-center justify-center">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
            </svg>
            <p></p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PanelBodyRightContainer;
