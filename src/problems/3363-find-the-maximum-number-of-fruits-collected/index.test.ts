import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumNumberOfFruitsCollected as maxCollectedFruits } from ".";

/** Tries every combination of the three children's paths. */
const byBruteForce = (fruits: number[][]): number => {
	const n = fruits.length;
	const paths = (
		start: [number, number],
		moves: [number, number][],
	): [number, number][][] => {
		let all: [number, number][][] = [[start]];
		for (let step = 0; step < n - 1; step++)
			all = all.flatMap((path) => {
				const [r, c] = path.at(-1) ?? [0, 0];
				return moves
					.map(([dr, dc]) => [r + dr, c + dc] as [number, number])
					.filter(([nr, nc]) => nr >= 0 && nc >= 0 && nr < n && nc < n)
					.map((cell) => [...path, cell]);
			});
		return all.filter((path) => {
			const [r, c] = path.at(-1) ?? [0, 0];
			return r === n - 1 && c === n - 1;
		});
	};
	const a = paths(
		[0, 0],
		[
			[1, 1],
			[1, 0],
			[0, 1],
		],
	);
	const b = paths(
		[0, n - 1],
		[
			[1, -1],
			[1, 0],
			[1, 1],
		],
	);
	const c = paths(
		[n - 1, 0],
		[
			[-1, 1],
			[0, 1],
			[1, 1],
		],
	);
	let best = 0;
	for (const p of a)
		for (const q of b)
			for (const r of c) {
				const seen = new Set([...p, ...q, ...r].map(([x, y]) => x * n + y));
				let sum = 0;
				for (const cell of seen)
					sum += fruits[Math.floor(cell / n)]?.[cell % n] ?? 0;
				best = Math.max(best, sum);
			}
	return best;
};

describe("3363. Find the Maximum Number of Fruits Collected", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxCollectedFruits([
				[1, 2, 3, 4],
				[5, 6, 8, 7],
				[9, 10, 11, 12],
				[13, 14, 15, 16],
			]),
		).toBe(100);
		expect(
			maxCollectedFruits([
				[1, 1],
				[1, 1],
			]),
		).toBe(4);
	});

	it("matches trying every path on small random grids", () => {
		const random = createRandom(3363);
		for (let run = 0; run < 30; run++) {
			const n = random.int(2, 4);
			const fruits = Array.from({ length: n }, () => random.array(n, 0, 9));
			expect(maxCollectedFruits(fruits)).toBe(byBruteForce(fruits));
		}
	});
});
