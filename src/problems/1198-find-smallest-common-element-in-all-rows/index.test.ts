import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSmallestCommonElementInAllRows as smallestCommonElement } from ".";

describe("1198. Find Smallest Common Element in All Rows", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			smallestCommonElement([
				[1, 2, 3, 4, 5],
				[2, 4, 5, 8, 10],
				[3, 5, 7, 9, 11],
				[1, 3, 5, 7, 9],
			]),
		).toBe(5);
		expect(
			smallestCommonElement([
				[1, 2, 3],
				[2, 3, 4],
				[2, 3, 5],
			]),
		).toBe(2);
	});

	it("matches checking every value of the first row on random inputs", () => {
		const random = createRandom(1198);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 5);
			const mat = Array.from({ length: random.int(1, 4) }, () =>
				[...new Set(random.array(n * 2, 1, 10))]
					.sort((a, b) => a - b)
					.slice(0, n),
			);
			const common = (mat[0] ?? []).filter((value) =>
				mat.every((row) => row.includes(value)),
			);
			expect(smallestCommonElement(mat)).toBe(
				common.length > 0 ? Math.min(...common) : -1,
			);
		}
	});
});
