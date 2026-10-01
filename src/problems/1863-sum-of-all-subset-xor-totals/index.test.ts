import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfAllSubsetXorTotals as subsetXORSum } from ".";

describe("1863. Sum of All Subset XOR Totals", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsetXORSum([1, 3])).toBe(6);
		expect(subsetXORSum([5, 1, 6])).toBe(28);
		expect(subsetXORSum([3, 4, 5, 6, 7, 8])).toBe(480);
	});

	it("matches XORing every subset on random inputs", () => {
		const random = createRandom(1863);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			let total = 0;
			for (let mask = 0; mask < 1 << nums.length; mask++)
				total += nums.reduce((x, v, i) => (mask & (1 << i) ? x ^ v : x), 0);
			expect(subsetXORSum(nums)).toBe(total);
		}
	});
});
