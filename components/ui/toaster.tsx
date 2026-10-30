"use client";

import { ToastContainer } from "react-toastify";

export function Toaster() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2600}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      theme="light"
      toastClassName="text-sm"
    />
  );
}
