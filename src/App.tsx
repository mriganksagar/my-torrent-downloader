import { Outlet } from "react-router-dom";
import { AddTorrent } from "./components";
import "./App.css";
import { Header } from "./components/Header";
import { Button } from "./shadui/ui/button";

export default function App(){
  return (
    <>
      <Header/>
      <div className="appcontainer">
        <Outlet/>
      </div>
    </>
  )
}