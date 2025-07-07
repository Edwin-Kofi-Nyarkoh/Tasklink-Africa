"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      <div className="text-lg font-medium">
        Verifying payment, please wait...
      </div>
    </div>
  );
}

function SuccessAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-20"
        />
        <path
          d="M7 13l3 3 7-7"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="text-lg font-semibold text-green-600">
        Payment Verified!
      </div>
    </div>
  );
}

function FailedAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg className="h-16 w-16 text-red-500" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-20"
        />
        <path
          d="M15 9l-6 6M9 9l6 6"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="text-lg font-semibold text-red-600">Payment Failed</div>
    </div>
  );
}

export default function VerifyBookings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  useEffect(() => {
    const verify = async () => {
      const reference =
        searchParams.get("reference") || searchParams.get("trxref");
      if (!reference) {
        setStatus("failed");
        setTimeout(
          () => router.replace("/dashboard?error=missing_reference"),
          2000
        );
        return;
      }
      try {
        const res = await fetch(`/api/payment/verify?reference=${reference}`);
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }
        const data = await res.json();
        if (data.error) {
          setStatus("failed");
          setTimeout(
            () =>
              router.replace(
                `/dashboard?error=${encodeURIComponent(data.error)}`
              ),
            2000
          );
        } else {
          setStatus("success");
          setTimeout(() => router.replace("/dashboard?payment=success"), 2000);
        }
      } catch {
        setStatus("failed");
        setTimeout(
          () => router.replace("/dashboard?error=verification_failed"),
          2000
        );
      }
    };
    verify();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      {status === "loading" && <Loader />}
      {status === "success" && <SuccessAnimation />}
      {status === "failed" && <FailedAnimation />}
    </div>
  );
}
