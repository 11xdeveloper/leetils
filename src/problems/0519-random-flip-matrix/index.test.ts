import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RandomFlipMatrix } from ".";

describe("519. Random Flip Matrix", () => {
	it("flips every cell exactly once before a reset, and again after one", () => {
		const matrix = new RandomFlipMatrix(3, 4, createRandom(519).next);
		for (let round = 0; round < 3; round++) {
			const flipped = new Set<string>();
			for (let i = 0; i < 12; i++) {
				const [row = -1, col = -1] = matrix.flip();
				expect(row).toBeWithin(0, 3);
				expect(col).toBeWithin(0, 4);
				flipped.add(`${row},${col}`);
			}
			expect(flipped.size).toBe(12);
			matrix.reset();
		}
	});

	it("picks each remaining cell with equal probability", () => {
		const random = createRandom(5190);
		const counts = new Map<string, number>();
		const trials = 60_000;
		for (let i = 0; i < trials; i++) {
			const matrix = new RandomFlipMatrix(2, 3, random.next);
			matrix.flip();
			const key = matrix.flip().join();
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}
		expect(counts.size).toBe(6);
		for (const count of counts.values())
			expect(Math.abs(count - trials / 6)).toBeLessThan(trials / 60);
	});

	it("handles a huge matrix without allocating it", () => {
		const matrix = new RandomFlipMatrix(
			10_000,
			10_000,
			createRandom(5191).next,
		);
		const flipped = new Set<string>();
		for (let i = 0; i < 1000; i++) flipped.add(matrix.flip().join());
		expect(flipped.size).toBe(1000);
	});
});
