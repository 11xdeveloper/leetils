import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { toeplitzMatrix as isToeplitzMatrix } from ".";

describe("766. Toeplitz Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isToeplitzMatrix([
				[1, 2, 3, 4],
				[5, 1, 2, 3],
				[9, 5, 1, 2],
			]),
		).toBeTrue();
		expect(
			isToeplitzMatrix([
				[1, 2],
				[2, 2],
			]),
		).toBeFalse();
	});

	it("matches collecting each diagonal on random matrices", () => {
		const random = createRandom(766);
		for (let run = 0; run < 1000; run++) {
			const cols = random.int(1, 4);
			const matrix = Array.from({ length: random.int(1, 4) }, () =>
				random.array(cols, 0, 1),
			);
			const diagonals = new Map<number, Set<number>>();
			for (const [r, row] of matrix.entries()) {
				for (const [c, value] of row.entries()) {
					const set = diagonals.get(r - c) ?? new Set<number>();
					set.add(value);
					diagonals.set(r - c, set);
				}
			}
			expect(isToeplitzMatrix(matrix)).toBe(
				[...diagonals.values()].every((set) => set.size === 1),
			);
		}
	});
});
