import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubArraysWithOddSum as numOfSubarrays } from ".";

describe("1524. Number of Sub-arrays With Odd Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfSubarrays([1, 3, 5])).toBe(4);
		expect(numOfSubarrays([2, 4, 6])).toBe(0);
		expect(numOfSubarrays([1, 2, 3, 4, 5, 6, 7])).toBe(16);
	});

	it("matches summing every subarray on random inputs", () => {
		const random = createRandom(1524);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 100);
			let expected = 0;
			for (let i = 0; i < arr.length; i++) {
				let sum = 0;
				for (let j = i; j < arr.length; j++) {
					sum += arr[j] ?? 0;
					if (sum % 2 === 1) expected++;
				}
			}
			expect(numOfSubarrays(arr)).toBe(expected);
		}
	});
});
