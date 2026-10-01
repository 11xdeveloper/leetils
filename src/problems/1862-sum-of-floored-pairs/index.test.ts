import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfFlooredPairs } from ".";

describe("1862. Sum of Floored Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfFlooredPairs([2, 5, 9])).toBe(10);
		expect(sumOfFlooredPairs([7, 7, 7, 7, 7, 7, 7])).toBe(49);
	});

	it("matches summing every pair on random inputs", () => {
		const random = createRandom(1862);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 50);
			let total = 0;
			for (const a of nums) for (const b of nums) total += Math.floor(a / b);
			expect(sumOfFlooredPairs(nums)).toBe(total);
		}
	});

	it("reduces large sums modulo 10^9 + 7", () => {
		expect(sumOfFlooredPairs([1, ...new Array(99999).fill(100000)])).toBe(
			(99999 * 100000 + 99999 * 99999 + 1) % 1_000_000_007,
		);
	});
});
