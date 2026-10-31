import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallyMaximumMexArray as maximumMEX } from ".";

/** Tries every way to cut the array. */
const byBruteForce = (nums: number[]): number[] => {
	const mex = (arr: number[]) => {
		let m = 0;
		while (arr.includes(m)) m++;
		return m;
	};
	const greater = (a: number[], b: number[]) => {
		for (let i = 0; i < Math.min(a.length, b.length); i++)
			if (a[i] !== b[i]) return (a[i] ?? 0) > (b[i] ?? 0);
		return a.length > b.length;
	};
	let best: number[] = [];
	for (let mask = 0; mask < 1 << (nums.length - 1); mask++) {
		const result: number[] = [];
		let from = 0;
		for (let i = 0; i < nums.length; i++)
			if (i === nums.length - 1 || (mask >> i) & 1) {
				result.push(mex(nums.slice(from, i + 1)));
				from = i + 1;
			}
		if (greater(result, best)) best = result;
	}
	return best;
};

describe("3948. Lexicographically Maximum MEX Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumMEX([0, 1, 0])).toEqual([2, 1]);
		expect(maximumMEX([1, 0, 2])).toEqual([3]);
		expect(maximumMEX([3, 1])).toEqual([0, 0]);
	});

	it("matches trying every cut on random arrays", () => {
		const random = createRandom(3948);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 3);
			expect(maximumMEX(nums)).toEqual(byBruteForce(nums));
		}
	});
});
