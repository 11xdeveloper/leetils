import { describe, expect, it } from "bun:test";
import { constructTheMinimumBitwiseArrayII as minBitwiseArray } from ".";

describe("3315. Construct the Minimum Bitwise Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minBitwiseArray([2, 3, 5, 7])).toEqual([-1, 1, 4, 3]);
		expect(minBitwiseArray([11, 13, 31])).toEqual([9, 12, 15]);
	});

	it("matches searching x upwards", () => {
		const primes = [
			2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
			71, 73, 79, 83, 89, 97, 127,
		];
		const expected = primes.map((p) => {
			for (let x = 0; x < p; x++) if ((x | (x + 1)) === p) return x;
			return -1;
		});
		expect(minBitwiseArray(primes)).toEqual(expected);
	});
});
