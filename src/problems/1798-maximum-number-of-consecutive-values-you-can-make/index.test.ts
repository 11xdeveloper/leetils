import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfConsecutiveValuesYouCanMake as getMaximumConsecutive } from ".";

describe("1798. Maximum Number of Consecutive Values You Can Make", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaximumConsecutive([1, 3])).toBe(2);
		expect(getMaximumConsecutive([1, 1, 1, 4])).toBe(8);
		expect(getMaximumConsecutive([1, 4, 10, 3, 1])).toBe(20);
	});

	it("matches listing every subset sum on random inputs", () => {
		const random = createRandom(1798);
		for (let run = 0; run < 300; run++) {
			const coins = random.array(random.int(1, 10), 1, 8);
			let sums = new Set([0]);
			for (const coin of coins)
				sums = new Set([...sums, ...[...sums].map((s) => s + coin)]);
			let count = 0;
			while (sums.has(count)) count++;
			expect(getMaximumConsecutive(coins)).toBe(count);
		}
	});
});
