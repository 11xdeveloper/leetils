import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicalNumbers } from "../0386-lexicographical-numbers";
import { kThSmallestInLexicographicalOrder as findKthNumber } from ".";

describe("440. K-th Smallest in Lexicographical Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKthNumber(13, 2)).toBe(10);
		expect(findKthNumber(1, 1)).toBe(1);
	});

	it("matches Lexicographical Numbers for every k with n up to 300", () => {
		for (let n = 1; n <= 300; n++) {
			const order = lexicographicalNumbers(n);
			for (let k = 1; k <= n; k++)
				expect(findKthNumber(n, k)).toBe(order[k - 1] ?? 0);
		}
	});

	it("matches Lexicographical Numbers at random positions for larger n", () => {
		const random = createRandom(440);
		const order = lexicographicalNumbers(50_000);
		for (let run = 0; run < 1000; run++) {
			const k = random.int(1, 50_000);
			expect(findKthNumber(50_000, k)).toBe(order[k - 1] ?? 0);
		}
	});

	it("handles the constraint of 10^9", () => {
		expect(findKthNumber(1e9, 1e9)).toBe(999999999);
	});
});
