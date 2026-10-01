import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumOfAbsoluteValueExpression as maxAbsValExpr } from ".";

/** Checks every pair. */
const byBruteForce = (arr1: number[], arr2: number[]): number => {
	let best = 0;
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr1.length; j++) {
			best = Math.max(
				best,
				Math.abs((arr1[i] ?? 0) - (arr1[j] ?? 0)) +
					Math.abs((arr2[i] ?? 0) - (arr2[j] ?? 0)) +
					Math.abs(i - j),
			);
		}
	}
	return best;
};

describe("1131. Maximum of Absolute Value Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAbsValExpr([1, 2, 3, 4], [-1, 4, 5, 6])).toBe(13);
		expect(maxAbsValExpr([1, -2, -5, 0, 10], [0, -2, -1, -7, -4])).toBe(20);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1131);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 20);
			const [arr1, arr2] = [random.array(n, -20, 20), random.array(n, -20, 20)];
			expect(maxAbsValExpr(arr1, arr2)).toBe(byBruteForce(arr1, arr2));
		}
	});
});
