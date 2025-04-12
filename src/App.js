import { useState } from "react";
import LatinSquareEditor from "./LatinSquareEditor";
import Puzzle from "./Puzzle";
import logo from "./assets/logo.png";


function App() {
  const [mode, setMode] = useState(1);

  return (
    <div className="App p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">🧠 라틴 방진 (Latin Square)</h1>

      <div className="mb-4 space-x-2 flex flex-col items-center">
        <div>
          <button
            className={`px-4 py-2 rounded border text-sm sm:text-base font-medium ${
              mode === 1 ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => setMode(1)}
          >
            문제 1 (기본)
          </button>
          <button
            className={`px-4 py-2 rounded border ml-2 text-sm sm:text-base font-medium ${
              mode === 2 ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => setMode(2)}
          >
            문제 2 (대각선 대칭)
          </button>
          <button
            className={`px-4 py-2 rounded border ml-2 text-sm sm:text-base font-medium ${
              mode === 3 ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => setMode(3)}
          >
            문제 3 (퍼즐)
          </button>
        </div>
        <div className="mt-2 text-base text-gray-800 font-semibold">
          현재 선택된 문제:{" "}
          <span className="text-blue-600">
            {mode === 1 ? "문제 1 - 기본 라틴 방진" : mode === 2 ? "문제 2 - 대각선 대칭" : "문제 3 - 빈칸 퍼즐"}
          </span>
        </div>
      </div>

      {mode === 3 ? <Puzzle /> : <LatinSquareEditor mode={mode} />}
      
    </div>
  );
}


export default App;
