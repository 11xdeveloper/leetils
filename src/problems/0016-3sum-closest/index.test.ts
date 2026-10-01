import { describe, expect, it } from "bun:test";
import { threeSumClosest } from ".";

/** All closest sums; there can be two (one on each side) in random inputs. */
const closestByBruteForce = (nums: number[], target: number): number[] => {
	const sums: number[] = [];
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				sums.push((nums[i] ?? 0) + (nums[j] ?? 0) + (nums[k] ?? 0));
			}
		}
	}
	const distance = Math.min(...sums.map((sum) => Math.abs(sum - target)));
	return sums.filter((sum) => Math.abs(sum - target) === distance);
};

describe("16. 3Sum Closest", () => {
	it("solves the examples from the problem statement", () => {
		expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2);
		expect(threeSumClosest([0, 0, 0], 1)).toBe(0);
	});

	it("returns the target when a triplet hits it exactly", () => {
		expect(threeSumClosest([1, 2, 3, 4, 5], 9)).toBe(9);
	});

	it("handles targets outside the range of possible sums", () => {
		expect(threeSumClosest([1, 2, 3, 4], 100)).toBe(9);
		expect(threeSumClosest([1, 2, 3, 4], -100)).toBe(6);
	});

	it("does not modify the input", () => {
		const nums = [3, -1, -2, 5];
		threeSumClosest(nums, 0);
		expect(nums).toEqual([3, -1, -2, 5]);
	});

	it("matches checking every triplet on random inputs", () => {
		let seed = 16;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 300; run++) {
			const nums = Array.from(
				{ length: 3 + (run % 12) },
				() => (next() % 41) - 20,
			);
			const target = (next() % 81) - 40;
			expect(closestByBruteForce(nums, target)).toContain(
				threeSumClosest(nums, target),
			);
		}
	});
});
