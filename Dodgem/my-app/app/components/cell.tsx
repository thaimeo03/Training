'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CellProps {
  item: number
  index: number
  endSelectedPos: number | null
  setEndSelectedPos: Dispatch<SetStateAction<number | null>>
  map: number[]
  setMap: Dispatch<SetStateAction<number[]>>
}

export default function Cell({ item, index, endSelectedPos, setEndSelectedPos, map, setMap }: CellProps) {
  const [isStartSelected, setIsStartSelected] = useState(false)

  const handleStartSelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsStartSelected(!isStartSelected)
  }

  const handleSelectEndPos = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEndSelectedPos(index)
  }

  useEffect(() => {    
    if(isStartSelected && endSelectedPos !== null) {
      const newMap = [...map]
      newMap[endSelectedPos] = 1
      newMap[index] = 0
      setMap(newMap)
    }
  }, [isStartSelected, endSelectedPos, setEndSelectedPos, setMap, index, map])

  return (
    <div
      className={`relative col-span-3 border border-pink-500`}
      onClick={handleSelectEndPos}
    >
      {
        item !==0 ? (
          <div onClick={handleStartSelected} className={`absolute w-full h-full cursor-pointer transition-all ${isStartSelected && 'bg-slate-700 bg-opacity-65'}`}>
            <div className="grid place-items-center h-full">
              <div className={`w-[90px] h-[90px] rounded-full ${item === 1 ? 'bg-white' : 'bg-black'}`}></div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}
