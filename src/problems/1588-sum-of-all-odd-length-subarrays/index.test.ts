import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfAllOddLengthSubarrays as sumOddLengthSubarrays } from ".";

describe("1588. Sum of All Odd Length Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOddLengthSubarrays([1, 4, 2, 5, 3])).toBe(58);
		expect(sumOddLengthSubarrays([1, 2])).toBe(3);
		expect(sumOddLengthSubarrays([10, 11, 12])).toBe(66);
	});

	it("matches summing every odd-length subarray on random inputs", () => {
		const random = createRandom(1588);
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(1, 15), 1, 1000);
			let expected = 0;
			for (let i = 0; i < arr.length; i++) {
				for (let j = i; j < arr.length; j += 2)
					expected += arr.slice(i, j + 1).reduce((s, x) => s + x, 0);
			}
			expect(sumOddLengthSubarrays(arr)).toBe(expected);
		}
	});
});
