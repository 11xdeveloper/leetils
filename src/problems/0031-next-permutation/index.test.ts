import { describe, expect, it } from "bun:test";
import { nextPermutation } from ".";

const next = (input: number[]): number[] => {
	const nums = [...input];
	nextPermutation(nums);
	return nums;
};

/** Every distinct permutation of `values`, in lexicographic order. */
const allPermutations = (values: number[]): number[][] => {
	if (values.length <= 1) return [values];
	const seen = new Set<number>();
	return values.flatMap((value, i) => {
		if (seen.has(value)) return [];
		seen.add(value);
		return allPermutations(values.toSpliced(i, 1)).map((rest) => [
			value,
			...rest,
		]);
	});
};

describe("31. Next Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(next([1, 2, 3])).toEqual([1, 3, 2]);
		expect(next([3, 2, 1])).toEqual([1, 2, 3]);
		expect(next([1, 1, 5])).toEqual([1, 5, 1]);
	});

	it("leaves a single element unchanged", () => {
		expect(next([1])).toEqual([1]);
	});

	it("modifies the array in place", () => {
		const nums = [1, 3, 2];
		expect(nextPermutation(nums)).toBeUndefined();
		expect(nums).toEqual([2, 1, 3]);
	});

	it("steps through every permutation in order and wraps around, with and without repeats", () => {
		for (const start of [
			[1, 2, 3, 4],
			[1, 1, 2, 2],
			[0, 1, 1, 2, 3],
		]) {
			const permutations = allPermutations(start);
			let nums = start;
			for (const expected of [...permutations.slice(1), permutations[0]]) {
				nums = next(nums);
				expect(nums).toEqual(expected ?? []);
			}
		}
	});
});
