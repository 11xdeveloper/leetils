import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAPeakElementII as findPeakGrid } from ".";

const isPeak = (mat: number[][], [r = 0, c = 0]: number[]) => {
	const value = mat[r]?.[c] ?? 0;
	return [
		[r - 1, c],
		[r + 1, c],
		[r, c - 1],
		[r, c + 1],
	].every(([i = 0, j = 0]) => (mat[i]?.[j] ?? -1) < value);
};

describe("1901. Find a Peak Element II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isPeak(
				[
					[1, 4],
					[3, 2],
				],
				findPeakGrid([
					[1, 4],
					[3, 2],
				]),
			),
		).toBeTrue();
		expect(
			findPeakGrid([
				[10, 20, 15],
				[21, 30, 14],
				[7, 16, 32],
			]),
		).toEqual([1, 1]);
	});

	it("finds a peak in random grids of distinct values", () => {
		const random = createRandom(1901);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 8), random.int(1, 8)];
			const values = Array.from({ length: m * n }, (_, i) => i + 1);
			for (let i = values.length - 1; i > 0; i--) {
				const j = random.int(0, i);
				[values[i], values[j]] = [values[j] ?? 0, values[i] ?? 0];
			}
			const mat = Array.from({ length: m }, (_, r) =>
				values.slice(r * n, (r + 1) * n),
			);
			expect(isPeak(mat, findPeakGrid(mat))).toBeTrue();
		}
	});
});
