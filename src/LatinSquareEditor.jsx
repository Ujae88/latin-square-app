import { useState } from "react";
import logo from "./assets/logo.png";


export default function LatinSquareEditor({ mode }) {
  const initialMatrix = [
    [1, 2, 3],
    [2, 3, 1],
    [3, 1, 2],
  ];

  const [matrix, setMatrix] = useState(initialMatrix);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const cycleRow = (rowIndex, direction) => {
    const newMatrix = [...matrix];
    const row = [...newMatrix[rowIndex]];
    if (direction === "left") {
      row.push(row.shift());
    } else {
      row.unshift(row.pop());
    }
    newMatrix[rowIndex] = row;
    setMatrix(newMatrix);
  };

  const swapCells = (rowIndex, colIndex) => {
    if (!selected) {
      setSelected({ row: rowIndex, col: colIndex });
    } else {
      const { row, col } = selected;
      if (row === rowIndex) {
        const newMatrix = [...matrix];
        const temp = newMatrix[rowIndex][col];
        newMatrix[rowIndex][col] = newMatrix[rowIndex][colIndex];
        newMatrix[rowIndex][colIndex] = temp;
        setMatrix(newMatrix);
      }
      setSelected(null);
    }
  };

  const isLatinSquare = (matrix) => {
    const n = matrix.length;
    const validSet = new Set([...Array(n).keys()].map(i => i + 1));
    for (let row of matrix) {
      if (new Set(row).size !== n || !row.every(num => validSet.has(num))) {
        return false;
      }
    }
    for (let col = 0; col < n; col++) {
      const column = matrix.map(row => row[col]);
      if (new Set(column).size !== n || !column.every(num => validSet.has(num))) {
        return false;
      }
    }
    return true;
  };

  const isSymmetric = (matrix) => {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] !== matrix[j][i]) return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 min-h-screen">
      <h1 className="text-xl font-bold">Latin Square Editor</h1>
      <div className="flex flex-col">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center">
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 border text-lg sm:text-xl mr-3"
              onClick={() => cycleRow(rowIndex, "left")}
            >
              ⬅
            </button>
            <div className="flex">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => swapCells(rowIndex, colIndex)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl font-semibold
                    flex items-center justify-center border cursor-pointer select-none ${selected?.row === rowIndex && selected?.col === colIndex ? "bg-blue-200" : ""}`}
                >
                  {cell}
                </div>
              ))}
            </div>
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 border text-lg sm:text-xl ml-3"
              onClick={() => cycleRow(rowIndex, "right")}
            >
              ➡
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded text-lg"
        onClick={() =>
          setIsCorrect(
            isLatinSquare(matrix) &&
            (mode === 1 || (mode === 2 && isSymmetric(matrix)))
          )
        }
      >
        정답 확인
      </button>
      {isCorrect !== null && (
        <div className="mt-2 text-lg font-semibold">
          {isCorrect ? "🎉 정답입니다!" : "❌ 아직 정답이 아닙니다."}
        </div>
      )}
      <div className="flex flex-col items-center mt-6">
  <img src={logo} alt="충남수학체험센터 로고" className="w-40 h-auto mb-3" />
  <div className="text-center text-gray-700 text-lg font-semibold">충남수학체험센터</div>
</div>

    </div>
  );
}
