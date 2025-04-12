import { useState } from "react";
import logo from "./assets/logo.png";

const puzzles = [
  [[1, "", 3], [2, "", 1], ["", "", 2]],
  [["", 2, ""], [2, 3, 1], [3, 1, ""]],
  [["", "", ""], [2, "", 1], [3, "", 2]],
  [[1, 2, ""], ["", 3, ""], ["", 1, ""]],
  [[1, "", 3], [2, "", 1], [3, 1, ""]],
  [["", 2, ""], [2, "", 1], [3, 1, 2]],
  [[1, "", ""], [2, 3, ""], [3, "", ""]],
  [["", "", 3], [2, 3, 1], [3, "", 2]],
  [[1, "", 3], [2, 3, 1], ["", "", 2]],
  [["", 2, ""], ["", 3, ""], [3, 1, ""]]
];

const validSet = new Set([1, 2, 3]);

export default function Puzzle() {
  const [original, setOriginal] = useState([]);
  const [puzzle, setPuzzle] = useState([]);
  const [status, setStatus] = useState(null);

  function randomPuzzle() {
    const pick = puzzles[Math.floor(Math.random() * puzzles.length)];
    setOriginal(pick.map(row => [...row]));
    setPuzzle(pick.map(row => [...row]));
    setStatus(null);
  }

  if (puzzle.length === 0) randomPuzzle();

  const handleChange = (e, row, col) => {
    const val = parseInt(e.target.value);
    const newPuzzle = puzzle.map(r => [...r]);
    newPuzzle[row][col] = isNaN(val) ? "" : val;
    setPuzzle(newPuzzle);
  };

  const isFull = matrix => matrix.every(row => row.every(cell => cell !== ""));

  const isValid = (matrix) => {
    for (let row of matrix) {
      const nums = row.filter(n => n !== "");
      if (new Set(nums).size !== nums.length) return false;
    }
    for (let col = 0; col < matrix.length; col++) {
      const nums = matrix.map(row => row[col]).filter(n => n !== "");
      if (new Set(nums).size !== nums.length) return false;
    }
    for (let row of matrix) {
      if (!row.every(n => n === "" || validSet.has(Number(n)))) return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col">
        {puzzle.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const isFixed = original[rowIndex][colIndex] !== "";
              return (
                <input
                  key={colIndex}
                  type="text"
                  value={cell}
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl font-bold text-center border ${isFixed ? "bg-gray-100 text-black" : "bg-white text-blue-600"}`}
                  disabled={isFixed}
                  maxLength={1}
                  inputMode="numeric"
                />
              );
            })}
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded text-lg"
        onClick={() => setStatus(isFull(puzzle) && isValid(puzzle))}
      >
        정답 확인
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded text-lg"
        onClick={randomPuzzle}
      >
        다음 퍼즐
      </button>
      {status !== null && (
        <div className="text-lg font-semibold mt-2">
          {status ? "🎉 정답입니다!" : "❌ 아직 정답이 아닙니다."}
        </div>
      )}
      <div className="flex flex-col items-center mt-6">
        <img
          src={logo}
          alt="충남수학체험센터 로고"
          className="w-40 h-auto mb-2"
        />
        <div className="text-center text-gray-700 text-lg font-semibold">
          충남수학체험센터
        </div>
      </div>
    </div>
  );
}
