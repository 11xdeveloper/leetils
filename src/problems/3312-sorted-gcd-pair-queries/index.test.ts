import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortedGcdPairQueries as gcdValues } from ".";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

describe("3312. Sorted GCD Pair Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(gcdValues([2, 3, 4], [0, 2, 2])).toEqual([1, 2, 2]);
		expect(gcdValues([4, 4, 2, 1], [5, 3, 1, 0])).toEqual([4, 2, 1, 1]);
		expect(gcdValues([2, 2], [0, 0])).toEqual([2, 2]);
	});

	it("matches sorting every pair's GCD on random arrays", () => {
		const random = createRandom(3312);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), 1, 30);
			const all: number[] = [];
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j < nums.length; j++)
					all.push(gcd(nums[i] ?? 0, nums[j] ?? 0));
			all.sort((a, b) => a - b);
			const queries = all.map((_, i) => i);
			expect(gcdValues(nums, queries)).toEqual(all);
		}
	});
});
