import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { candyCrush } from ".";

/** Crushes using regular expressions over rows and columns, one round at a time. */
const bySimulation = (input: number[][]): number[][] => {
	let board = input.map((row) => [...row]);
	const m = board.length;
	const n = board[0]?.length ?? 0;
	for (;;) {
		const crushed = new Set<string>();
		const scan = (cells: [number, number][]) => {
			for (let i = 0; i < cells.length; ) {
				const [r, c] = cells[i] ?? [0, 0];
				const candy = board[r]?.[c] ?? 0;
				let j = i;
				while (
					j < cells.length &&
					board[cells[j]?.[0] ?? 0]?.[cells[j]?.[1] ?? 0] === candy
				)
					j++;
				if (candy !== 0 && j - i >= 3)
					for (let k = i; k < j; k++) crushed.add(String(cells[k]));
				i = j;
			}
		};
		for (let r = 0; r < m; r++)
			scan(Array.from({ length: n }, (_, c) => [r, c]));
		for (let c = 0; c < n; c++)
			scan(Array.from({ length: m }, (_, r) => [r, c]));
		if (crushed.size === 0) return board;
		const columns = Array.from({ length: n }, (_, c) =>
			Array.from({ length: m }, (_, r) =>
				crushed.has(String([r, c])) ? 0 : (board[r]?.[c] ?? 0),
			).filter((candy) => candy !== 0),
		);
		board = Array.from({ length: m }, (_, r) =>
			columns.map((column) => column[r - (m - column.length)] ?? 0),
		);
	}
};

describe("723. Candy Crush", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			candyCrush([
				[110, 5, 112, 113, 114],
				[210, 211, 5, 213, 214],
				[310, 311, 3, 313, 314],
				[410, 411, 412, 5, 414],
				[5, 1, 512, 3, 3],
				[610, 4, 1, 613, 614],
				[710, 1, 2, 713, 714],
				[810, 1, 2, 1, 1],
				[1, 1, 2, 2, 2],
				[4, 1, 4, 4, 1014],
			]),
		).toEqual([
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[110, 0, 0, 0, 114],
			[210, 0, 0, 0, 214],
			[310, 0, 0, 113, 314],
			[410, 0, 0, 213, 414],
			[610, 211, 112, 313, 614],
			[710, 311, 412, 613, 714],
			[810, 411, 512, 713, 1014],
		]);
		expect(
			candyCrush([
				[1, 3, 5, 5, 2],
				[3, 4, 3, 3, 1],
				[3, 2, 4, 5, 2],
				[2, 4, 4, 5, 5],
				[1, 4, 4, 1, 1],
			]),
		).toEqual([
			[1, 3, 0, 0, 0],
			[3, 4, 0, 5, 2],
			[3, 2, 0, 3, 1],
			[2, 4, 0, 5, 2],
			[1, 4, 3, 1, 1],
		]);
	});

	it("matches scanning runs on random boards", () => {
		const random = createRandom(723);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(3, 6);
			const board = Array.from({ length: random.int(3, 6) }, () =>
				random.array(cols, 1, 3),
			);
			expect(candyCrush(board.map((row) => [...row]))).toEqual(
				bySimulation(board),
			);
		}
	});
});
