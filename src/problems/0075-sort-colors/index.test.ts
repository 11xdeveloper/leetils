import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortColors } from ".";

const sorted = (nums: number[]): number[] => {
	const copy = [...nums];
	sortColors(copy);
	return copy;
};

describe("75. Sort Colors", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted([2, 0, 2, 1, 1, 0])).toEqual([0, 0, 1, 1, 2, 2]);
		expect(sorted([2, 0, 1])).toEqual([0, 1, 2]);
	});

	it("handles a single element and a single color", () => {
		expect(sorted([1])).toEqual([1]);
		expect(sorted([2, 2, 2])).toEqual([2, 2, 2]);
	});

	it("sorts in place", () => {
		const nums = [2, 1, 0];
		expect(sortColors(nums)).toBeUndefined();
		expect(nums).toEqual([0, 1, 2]);
	});

	it("matches Array.prototype.sort on random inputs", () => {
		const random = createRandom(75);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 20), 0, 2);
			expect(sorted(nums)).toEqual(nums.toSorted((a, b) => a - b));
		}
	});
});
