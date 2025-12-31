"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { fonts } from "@repo/design-system/lib/fonts";
// import { captureException } from "@sentry/nextjs";
import type NextError from "next/error";
import { useEffect } from "react";

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  useEffect(() => {
    // captureException(error);
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html className={fonts} lang="en">
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">出错了</h1>
          <p className="text-gray-600 mb-4">抱歉，应用遇到了一个错误</p>
          {error.digest && (
            <p className="text-sm text-gray-500 mb-4">
              错误代码: {error.digest}
            </p>
          )}
          <Button onClick={() => reset()}>重试</Button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
