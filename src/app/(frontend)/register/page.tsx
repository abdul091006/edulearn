import React, { ReactElement } from "react";
import RegisterForm from "./_components/RegisterForm";
export default async function page(): Promise<ReactElement> {
  return (
    <div className="h-[calc(100vh-3rem)]">
        <RegisterForm />
    </div>
  )
}

