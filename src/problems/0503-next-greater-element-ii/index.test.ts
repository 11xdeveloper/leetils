import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nextGreaterElementII as nextGreaterElements } from ".";

const byScanning = (nums: number[]): number[] =>
	nums.map((num, i) => {
		for (let step = 1; step < nums.length; step++) {
			const other = nums[(i + step) % nums.length] ?? 0;
			if (other > num) return other;
		}
		return -1;
	});

describe("503. Next Greater Element II", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextGreaterElements([1, 2, 1])).toEqual([2, -1, 2]);
		expect(nextGreaterElements([1, 2, 3, 4, 3])).toEqual([2, 3, 4, -1, 4]);
	});

	it("matches scanning around the circle on random inputs", () => {
		const random = createRandom(503);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -3, 3);
			expect(nextGreaterElements(nums)).toEqual(byScanning(nums));
		}
	});
});
