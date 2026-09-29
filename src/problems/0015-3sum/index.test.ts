import { describe, expect, it } from "bun:test";
import { threeSum } from ".";

const normalize = (triplets: number[][]): string[] =>
	triplets.map((t) => t.toSorted((a, b) => a - b).join(",")).toSorted();

const byBruteForce = (nums: number[]): string[] => {
	const found = new Set<string>();
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				const triplet = [nums[i] ?? 0, nums[j] ?? 0, nums[k] ?? 0];
				if (triplet.reduce((sum, n) => sum + n, 0) === 0) {
					found.add(triplet.toSorted((a, b) => a - b).join(","));
				}
			}
		}
	}
	return [...found].toSorted();
};

describe("15. 3Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(normalize(threeSum([-1, 0, 1, 2, -1, -4]))).toEqual(
			normalize([
				[-1, -1, 2],
				[-1, 0, 1],
			]),
		);
		expect(threeSum([0, 1, 1])).toEqual([]);
		expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
	});

	it("returns each triplet once, however often its values repeat", () => {
		expect(threeSum([0, 0, 0, 0, 0])).toEqual([[0, 0, 0]]);
		expect(normalize(threeSum([-2, 0, 0, 2, 2]))).toEqual(["-2,0,2"]);
	});

	it("does not modify the input", () => {
		const nums = [3, -1, -2];
		threeSum(nums);
		expect(nums).toEqual([3, -1, -2]);
	});

	it("matches checking every triplet on random inputs", () => {
		let seed = 15;
		for (let run = 0; run < 300; run++) {
			const nums = Array.from({ length: 3 + (run % 15) }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return (seed % 11) - 5;
			});
			expect(normalize(threeSum(nums))).toEqual(byBruteForce(nums));
		}
	});
});
