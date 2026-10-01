import { describe, expect, it } from "bun:test";
import { rotateArray } from ".";

const rotate = (values: number[], k: number): number[] => {
	const nums = [...values];
	expect(rotateArray(nums, k)).toBeUndefined();
	return nums;
};

const bySlicing = (values: number[], k: number): number[] => {
	const steps = k % values.length;
	return [
		...values.slice(values.length - steps),
		...values.slice(0, values.length - steps),
	];
};

describe("189. Rotate Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotate([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([5, 6, 7, 1, 2, 3, 4]);
		expect(rotate([-1, -100, 3, 99], 2)).toEqual([3, 99, -1, -100]);
	});

	it("handles k larger than the array and k of 0", () => {
		expect(rotate([1, 2], 5)).toEqual([2, 1]);
		expect(rotate([1, 2, 3], 0)).toEqual([1, 2, 3]);
	});

	it("matches slicing for every length and k", () => {
		for (let n = 1; n <= 12; n++) {
			const values = Array.from({ length: n }, (_, i) => i);
			for (let k = 0; k <= 2 * n; k++)
				expect(rotate(values, k)).toEqual(bySlicing(values, k));
		}
	});
});
