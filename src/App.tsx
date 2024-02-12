import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { cn } from "./lib/utils";

export default function App(){
  return (
    <>
      <Header/>
      <div className={cn("flex","flex-col","p-4", "mx-auto", "flex-1", "w-full")}>
        <Outlet/>
      </div>
    </>
  )
}