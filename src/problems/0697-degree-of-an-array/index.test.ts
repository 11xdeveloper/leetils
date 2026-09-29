import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { degreeOfAnArray as findShortestSubArray } from ".";

const degree = (values: number[]): number => {
	const counts = new Map<number, number>();
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
	return Math.max(...counts.values());
};

describe("697. Degree of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findShortestSubArray([1, 2, 2, 3, 1])).toBe(2);
		expect(findShortestSubArray([1, 2, 2, 3, 1, 4, 2])).toBe(6);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(697);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 0, 4);
			const target = degree(nums);
			let shortest = nums.length;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i + 1; j <= nums.length; j++)
					if (degree(nums.slice(i, j)) === target)
						shortest = Math.min(shortest, j - i);
			}
			expect(findShortestSubArray(nums)).toBe(shortest);
		}
	});
});
