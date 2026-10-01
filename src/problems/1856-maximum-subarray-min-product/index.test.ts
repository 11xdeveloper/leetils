import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarrayMinProduct as maxSumMinProduct } from ".";

describe("1856. Maximum Subarray Min-Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumMinProduct([1, 2, 3, 2])).toBe(14);
		expect(maxSumMinProduct([2, 3, 3, 1, 2])).toBe(18);
		expect(maxSumMinProduct([3, 1, 5, 6, 4, 2])).toBe(60);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1856);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 10);
			let best = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i; j < nums.length; j++) {
					const sub = nums.slice(i, j + 1);
					best = Math.max(
						best,
						Math.min(...sub) * sub.reduce((s, v) => s + v, 0),
					);
				}
			}
			expect(maxSumMinProduct(nums)).toBe(best);
		}
	});

	it("maximises before reducing modulo 10^9 + 7", () => {
		expect(maxSumMinProduct(new Array(100000).fill(10_000_000))).toBe(
			Number((10n ** 7n * 10n ** 12n) % 1_000_000_007n),
		);
	});
});
