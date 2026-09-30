import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubArraysOfSizeKAndAverageGreaterThanOrEqualToThreshold as numOfSubarrays } from ".";

describe("1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)).toBe(3);
		expect(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)).toBe(6);
	});

	it("matches averaging every window on random inputs", () => {
		const random = createRandom(1343);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 10);
			const k = random.int(1, arr.length);
			const threshold = random.int(0, 10);
			let expected = 0;
			for (let i = 0; i + k <= arr.length; i++) {
				if (arr.slice(i, i + k).reduce((s, x) => s + x, 0) / k >= threshold)
					expected++;
			}
			expect(numOfSubarrays(arr, k, threshold)).toBe(expected);
		}
	});
});
