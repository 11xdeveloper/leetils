import { describe, expect, it } from "bun:test";
import { elementsInArrayAfterRemovingAndReplacingElements as elementInNums } from ".";

describe("2113. Elements in Array After Removing and Replacing Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			elementInNums(
				[0, 1, 2],
				[
					[0, 2],
					[2, 0],
					[3, 2],
					[5, 0],
				],
			),
		).toEqual([2, 2, -1, 0]);
		expect(
			elementInNums(
				[2],
				[
					[0, 0],
					[1, 0],
					[2, 0],
					[3, 0],
				],
			),
		).toEqual([2, -1, 2, -1]);
	});

	it("matches simulating minute by minute", () => {
		const nums = [5, 6, 7, 8];
		const array = [...nums];
		let shrinking = true;
		for (let time = 0; time < 20; time++) {
			for (let index = 0; index < nums.length; index++)
				expect(elementInNums(nums, [[time, index]])).toEqual([
					array[index] ?? -1,
				]);
			if (shrinking) array.shift();
			else array.push(nums[array.length] ?? 0);
			if (array.length === 0) shrinking = false;
			else if (array.length === nums.length) shrinking = true;
		}
	});
});
