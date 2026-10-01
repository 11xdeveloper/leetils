import { describe, expect, it } from "bun:test";
import { fourSum } from ".";

const normalize = (quadruplets: number[][]): string[] =>
	quadruplets.map((q) => q.toSorted((a, b) => a - b).join(",")).toSorted();

const byBruteForce = (nums: number[], target: number): string[] => {
	const found = new Set<string>();
	const n = nums.length;
	for (let a = 0; a < n; a++) {
		for (let b = a + 1; b < n; b++) {
			for (let c = b + 1; c < n; c++) {
				for (let d = c + 1; d < n; d++) {
					const q = [nums[a] ?? 0, nums[b] ?? 0, nums[c] ?? 0, nums[d] ?? 0];
					if (q.reduce((sum, x) => sum + x, 0) === target) {
						found.add(q.toSorted((x, y) => x - y).join(","));
					}
				}
			}
		}
	}
	return [...found].toSorted();
};

describe("18. 4Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(normalize(fourSum([1, 0, -1, 0, -2, 2], 0))).toEqual(
			normalize([
				[-2, -1, 1, 2],
				[-2, 0, 0, 2],
				[-1, 0, 0, 1],
			]),
		);
		expect(fourSum([2, 2, 2, 2, 2], 8)).toEqual([[2, 2, 2, 2]]);
	});

	it("returns nothing when there are fewer than four numbers", () => {
		expect(fourSum([1, 2, 3], 6)).toEqual([]);
	});

	it("handles sums beyond the 32-bit range", () => {
		expect(fourSum([1e9, 1e9, 1e9, 1e9], -294967296)).toEqual([]);
		expect(fourSum([1e9, 1e9, 1e9, 1e9], 4e9)).toEqual([[1e9, 1e9, 1e9, 1e9]]);
	});

	it("does not modify the input", () => {
		const nums = [3, -1, -2, 0, 5];
		fourSum(nums, 0);
		expect(nums).toEqual([3, -1, -2, 0, 5]);
	});

	it("matches checking every quadruplet on random inputs", () => {
		let seed = 18;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 200; run++) {
			const nums = Array.from(
				{ length: 4 + (run % 10) },
				() => (next() % 9) - 4,
			);
			const target = (next() % 9) - 4;
			expect(normalize(fourSum(nums, target))).toEqual(
				byBruteForce(nums, target),
			);
		}
	});
});
