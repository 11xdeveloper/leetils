import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestLineOfConsecutiveOneInMatrix as longestLine } from ".";

/** Walks from every cell in every direction. */
const byBruteForce = (mat: number[][]): number => {
	let longest = 0;
	for (const [r, row] of mat.entries()) {
		for (const [c] of row.entries()) {
			for (const [dr, dc] of [
				[0, 1],
				[1, 0],
				[1, 1],
				[1, -1],
			] as const) {
				let length = 0;
				while (mat[r + dr * length]?.[c + dc * length] === 1) length++;
				longest = Math.max(longest, length);
			}
		}
	}
	return longest;
};

describe("562. Longest Line of Consecutive One in Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestLine([
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 1],
			]),
		).toBe(3);
		expect(
			longestLine([
				[1, 1, 1, 1],
				[0, 1, 1, 0],
				[0, 0, 0, 1],
			]),
		).toBe(4);
	});

	it("matches walking every direction on random matrices", () => {
		const random = createRandom(562);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const mat = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 1),
			);
			expect(longestLine(mat)).toBe(byBruteForce(mat));
		}
	});
});
