const knightPositions = (pawnPositions: string[]): string[] => {
  const board: number[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => 0),
  );

  const pawnMoves: number[][] = [
    [-1, 2],
    [1, 2],
    [-2, 1],
    [2, 1],
    [-2, -1],
    [2, -1],
    [-1, -2],
    [1, -2],
  ];

  pawnPositions.forEach((pawn) => {
    const [file, rank] = pawn.split("");
    const fileIndex = file.charCodeAt(0) - "a".charCodeAt(0);
    const rankIndex = parseInt(rank) - 1;
    board[rankIndex][fileIndex] = 1;
  });

  const maxCaptures: number = board.reduce(
    (max: number, row: number[], rank: number) => {
      return row.reduce((rowMax: number, square: number, file: number) => {
        if (square === 0) {
          const captures: number = pawnMoves.reduce(
            (count: number, move: number[]) => {
              const newRank: number = rank + move[1];
              const newFile: number = file + move[0];
              if (
                newRank >= 0 &&
                newRank < 8 &&
                newFile >= 0 &&
                newFile < 8 &&
                board[newRank][newFile] === 1
              ) {
                return count + 1;
              }
              return count;
            },
            0,
          );
          return Math.max(rowMax, captures);
        }
        return rowMax;
      }, max);
    },
    0,
  );

  const maxPositions: number[][] = board.reduce(
    (positions: number[][], row: number[], rank: number) => {
      return row.reduce(
        (rowPositions: number[][], square: number, file: number) => {
          if (square === 0) {
            const captures: number = pawnMoves.reduce(
              (count: number, move: number[]) => {
                const newRank: number = rank + move[1];
                const newFile: number = file + move[0];
                if (
                  newRank >= 0 &&
                  newRank < 8 &&
                  newFile >= 0 &&
                  newFile < 8 &&
                  board[newRank][newFile] === 1
                ) {
                  return count + 1;
                }
                return count;
              },
              0,
            );
            if (captures === maxCaptures) {
              rowPositions.push([file, rank]);
            }
          }
          return rowPositions;
        },
        positions,
      );
    },
    [],
  );

  return maxPositions.map(
    ([file, rank]) =>
      String.fromCharCode(file + "a".charCodeAt(0)) + (rank + 1),
  );
};

const input1: Array<string> = ["a1", "b6", "c3", "e5", "f8", "h4"];
const input2: Array<string> = ["a1", "b6", "c3", "f8", "h4"];

console.log("Case 1", knightPositions(input1));
console.log("Case 2", knightPositions(input2));
