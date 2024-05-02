import Image from "next/image";

import Login from "./login/page";
//IMPORTS
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login></Login>
    </main>
  );
}
