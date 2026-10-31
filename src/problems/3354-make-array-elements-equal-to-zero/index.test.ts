import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeArrayElementsEqualToZero as countValidSelections } from ".";

/** Runs the walk from every start. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	nums.forEach((num, start) => {
		if (num !== 0) return;
		for (const dir of [-1, 1]) {
			const arr = [...nums];
			let at = start;
			let d = dir;
			while (at >= 0 && at < arr.length) {
				if ((arr[at] ?? 0) > 0) {
					arr[at] = (arr[at] ?? 0) - 1;
					d = -d;
				}
				at += d;
			}
			if (arr.every((v) => v === 0)) count++;
		}
	});
	return count;
};

describe("3354. Make Array Elements Equal to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(countValidSelections([1, 0, 2, 0, 3])).toBe(2);
		expect(countValidSelections([2, 3, 4, 0, 4, 1, 0])).toBe(0);
	});

	it("matches running every walk on random arrays", () => {
		const random = createRandom(3354);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 0, 3);
			if (!nums.includes(0)) nums[random.int(0, nums.length - 1)] = 0;
			expect(countValidSelections(nums)).toBe(byBruteForce(nums));
		}
	});
});
