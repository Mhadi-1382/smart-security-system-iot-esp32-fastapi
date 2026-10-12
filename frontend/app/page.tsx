"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/panel");
    }, 3000);

    return () => clearTimeout(t);
  }, [router]);

  return <div className="flex items-center justify-center w-full absolute inset-0">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[43px] p-2 bg-green-100 rounded-full animate-spin flex items-center justify-center">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  </div>;
}
