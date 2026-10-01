import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { transformToChessboard as movesToChessboard } from ".";

/** Breadth-first search over row and column swaps. */
const bySearch = (board: number[][]): number => {
	const n = board.length;
	const isChessboard = (b: number[][]) =>
		b.every((row, r) =>
			row.every(
				(cell, c) =>
					(c + 1 >= n || cell !== row[c + 1]) &&
					(r + 1 >= n || cell !== b[r + 1]?.[c]),
			),
		);
	const seen = new Set([JSON.stringify(board)]);
	let frontier = [board];
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: number[][][] = [];
		for (const current of frontier) {
			if (isChessboard(current)) return moves;
			for (let i = 0; i < n; i++) {
				for (let j = i + 1; j < n; j++) {
					const rows = current.map((row) => [...row]);
					[rows[i], rows[j]] = [rows[j] ?? [], rows[i] ?? []];
					const cols = current.map((row) => {
						const copy = [...row];
						[copy[i], copy[j]] = [row[j] ?? 0, row[i] ?? 0];
						return copy;
					});
					for (const candidate of [rows, cols]) {
						const key = JSON.stringify(candidate);
						if (!seen.has(key)) {
							seen.add(key);
							next.push(candidate);
						}
					}
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("782. Transform to Chessboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			movesToChessboard([
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[1, 0, 0, 1],
				[1, 0, 0, 1],
			]),
		).toBe(2);
		expect(
			movesToChessboard([
				[0, 1],
				[1, 0],
			]),
		).toBe(0);
		expect(
			movesToChessboard([
				[1, 0],
				[1, 0],
			]),
		).toBe(-1);
	});

	it("matches searching every sequence of swaps on shuffled and random boards", () => {
		const random = createRandom(782);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 4);
			const rows = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const cols = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const shuffled = rows.map((r) => cols.map((c) => (r + c) % 2));
			expect(movesToChessboard(shuffled)).toBe(bySearch(shuffled));
			const noisy = Array.from({ length: n }, () => random.array(n, 0, 1));
			expect(movesToChessboard(noisy)).toBe(bySearch(noisy));
		}
	});
});
