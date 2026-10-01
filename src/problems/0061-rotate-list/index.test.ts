import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { rotateList } from ".";

const rotate = (values: number[], k: number): number[] =>
	listToArray(rotateList(listFromArray(values), k));

const byArray = (values: number[], k: number): number[] => {
	const steps = values.length === 0 ? 0 : k % values.length;
	return [
		...values.slice(values.length - steps),
		...values.slice(0, values.length - steps),
	];
};

describe("61. Rotate List", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotate([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]);
		expect(rotate([0, 1, 2], 4)).toEqual([2, 0, 1]);
	});

	it("handles an empty list and a single node", () => {
		expect(rotate([], 3)).toEqual([]);
		expect(rotate([1], 99)).toEqual([1]);
	});

	it("handles very large k without looping k times", () => {
		expect(rotate([1, 2, 3], 2e9)).toEqual(byArray([1, 2, 3], 2e9));
	});

	it("matches rotating an array for every k up to twice the length", () => {
		const values = [1, 2, 3, 4, 5, 6, 7];
		for (let k = 0; k <= 14; k++) {
			expect(rotate(values, k)).toEqual(byArray(values, k));
		}
	});
});
