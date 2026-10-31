import { describe, expect, it } from "bun:test";
import { numberOfUniqueXorTripletsI as uniqueXorTriplets } from ".";

describe("3513. Number of Unique XOR Triplets I", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueXorTriplets([1, 2])).toBe(2);
		expect(uniqueXorTriplets([3, 1, 2])).toBe(4);
	});

	it("matches trying every triplet", () => {
		for (let n = 1; n <= 20; n++) {
			const nums = Array.from({ length: n }, (_, i) => i + 1);
			const values = new Set<number>();
			for (let i = 0; i < n; i++)
				for (let j = i; j < n; j++)
					for (let k = j; k < n; k++)
						values.add((nums[i] ?? 0) ^ (nums[j] ?? 0) ^ (nums[k] ?? 0));
			expect(uniqueXorTriplets(nums)).toBe(values.size);
		}
	});
});
