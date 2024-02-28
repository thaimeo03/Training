'use client'
import { useState } from "react";
import Cell from "./components/cell";
import { START } from "./constants/start";

export default function Home() {
  const [map, setMap] = useState(START)
  const [endSelectedPos, setEndSelectedPos] = useState<number | null>(null)

  return (
    <main className="h-screen grid place-items-center">
      <div className="w-[350px] h-[350px] bg-slate-400">
        <div className="h-full grid grid-cols-9">
          {
            map.map((item, index) => <Cell key={index} item={item} endSelectedPos={endSelectedPos} index={index} setEndSelectedPos={setEndSelectedPos} map={map} setMap={setMap}/>)
          }
        </div>
      </div>
    </main>
  );
}
