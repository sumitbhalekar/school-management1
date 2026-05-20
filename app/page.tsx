import Image from "next/image";
import Login from "./login/page";
import CreateUser from "./createUser/page";
import BeginningCode from "./login/Login";
import { InventoryList } from "./inventory/inventoryList";

export default function Home() {
  return (
    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    // <CreateUser />
    <InventoryList />
    // <BeginningCode />
    //  <Login />
    // </div>
  );
}
