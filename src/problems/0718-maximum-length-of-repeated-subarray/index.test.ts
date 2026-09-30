import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumLengthOfRepeatedSubarray as findLength } from ".";

const byBruteForce = (a: number[], b: number[]): number => {
	let longest = 0;
	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < b.length; j++) {
			let length = 0;
			while (
				i + length < a.length &&
				j + length < b.length &&
				a[i + length] === b[j + length]
			)
				length++;
			longest = Math.max(longest, length);
		}
	}
	return longest;
};

describe("718. Maximum Length of Repeated Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7])).toBe(3);
		expect(findLength([0, 0, 0, 0, 0], [0, 0, 0, 0, 0])).toBe(5);
	});

	it("matches comparing every pair of starts on random inputs", () => {
		const random = createRandom(718);
		for (let run = 0; run < 1000; run++) {
			const a = random.array(random.int(1, 12), 0, 2);
			const b = random.array(random.int(1, 12), 0, 2);
			expect(findLength(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
