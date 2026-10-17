/**
 * 2056. Number of Valid Move Combinations On Chessboard
 *
 * Up to four rooks, queens and bishops on an 8 × 8 board each pick a
 * direction and distance (or stay), then all move one square per second
 * until they reach their destinations. Counts the combinations in which no
 * two pieces ever share a square at the same second.
 *
 * Enumerate each piece's moves and try every combination, checking each
 * new piece against those already placed second by second.
 *
 * @see https://leetcode.com/problems/number-of-valid-move-combinations-on-chessboard/
 * @difficulty Hard
 * @timeComplexity O(M^p · p · 8) for at most M = 29 moves per piece
 * @spaceComplexity O(p · M)
 *
 * @example
 * numberOfValidMoveCombinationsOnChessboard(["rook"], [[1, 1]]); // 15
 */
export const numberOfValidMoveCombinationsOnChessboard = (
	pieces: readonly string[],
	positions: readonly (readonly number[])[],
): number => {
	type Move = [dr: number, dc: number, steps: number];
	const straight = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];
	const diagonal = [
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	];
	const directions: Record<string, number[][]> = {
		rook: straight,
		bishop: diagonal,
		queen: [...straight, ...diagonal],
	};

	const moves = pieces.map((piece, i): Move[] => {
		const [row = 1, col = 1] = positions[i] ?? [];
		const options: Move[] = [[0, 0, 0]];
		for (const [dr = 0, dc = 0] of directions[piece] ?? []) {
			for (let steps = 1; ; steps++) {
				const [r, c] = [row + dr * steps, col + dc * steps];
				if (r < 1 || r > 8 || c < 1 || c > 8) break;
				options.push([dr, dc, steps]);
			}
		}
		return options;
	});

	const at = (piece: number, move: Move, second: number): number => {
		const [row = 1, col = 1] = positions[piece] ?? [];
		const t = Math.min(second, move[2]);
		return (row + move[0] * t) * 10 + (col + move[1] * t);
	};
	const collide = (a: number, moveA: Move, b: number, moveB: Move): boolean => {
		const seconds = Math.max(moveA[2], moveB[2], 1);
		for (let second = 1; second <= seconds; second++)
			if (at(a, moveA, second) === at(b, moveB, second)) return true;
		return false;
	};

	const chosen: Move[] = [];
	const count = (piece: number): number => {
		if (piece === pieces.length) return 1;
		let total = 0;
		for (const move of moves[piece] ?? []) {
			if (chosen.some((other, earlier) => collide(earlier, other, piece, move)))
				continue;
			chosen.push(move);
			total += count(piece + 1);
			chosen.pop();
		}
		return total;
	};
	return count(0);
};
