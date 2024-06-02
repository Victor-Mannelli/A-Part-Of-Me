import { Dispatch, ReactNode, SetStateAction } from "react";
import React from "react";

export function PopUp({ show, setShow, bg, children }: {
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  show: boolean;
  bg?: boolean;
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full ${show ? "flex" : "hidden"} ${bg ? "bg-black bg-opacity-50" : ""} justify-center items-center z-50`}
      onClick={() => setShow(!show)}
    >
      {children}
    </div>
  );
}
