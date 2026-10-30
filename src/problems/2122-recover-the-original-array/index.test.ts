import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { recoverTheOriginalArray as recoverArray } from ".";

/** Checks that some k > 0 turns `arr` into `nums`. */
const expectRecovers = (nums: number[], arr: number[]): void => {
	expect(arr.length * 2).toBe(nums.length);
	const sorted = nums.toSorted((a, b) => a - b);
	const k = Math.min(...arr) - (sorted[0] ?? 0);
	expect(k).toBeGreaterThan(0);
	expect(arr.flatMap((v) => [v - k, v + k]).sort((a, b) => a - b)).toEqual(
		sorted,
	);
};

describe("2122. Recover the Original Array", () => {
	it("solves the examples from the problem statement", () => {
		expectRecovers([2, 10, 6, 4, 8, 12], recoverArray([2, 10, 6, 4, 8, 12]));
		expectRecovers([1, 1, 3, 3], recoverArray([1, 1, 3, 3]));
		expect(recoverArray([5, 435])).toEqual([220]);
	});

	it("recovers random arrays", () => {
		const random = createRandom(2122);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 6), 1, 20);
			const k = random.int(1, 6);
			const nums = arr
				.flatMap((v) => [v - k, v + k])
				.sort(() => random.next() - 0.5);
			expectRecovers(nums, recoverArray(nums));
		}
	});
});
