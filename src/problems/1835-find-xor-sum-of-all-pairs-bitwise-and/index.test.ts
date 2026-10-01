import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findXorSumOfAllPairsBitwiseAnd as getXORSum } from ".";

describe("1835. Find XOR Sum of All Pairs Bitwise AND", () => {
	it("solves the examples from the problem statement", () => {
		expect(getXORSum([1, 2, 3], [6, 5])).toBe(0);
		expect(getXORSum([12], [4])).toBe(4);
	});

	it("matches XORing every pair on random inputs", () => {
		const random = createRandom(1835);
		for (let run = 0; run < 200; run++) {
			const [a, b] = [
				random.array(random.int(1, 8), 0, 10 ** 9),
				random.array(random.int(1, 8), 0, 10 ** 9),
			];
			let expected = 0;
			for (const x of a) for (const y of b) expected ^= x & y;
			expect(getXORSum(a, b)).toBe(expected);
		}
	});
});
