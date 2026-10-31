import { describe, expect, it } from "bun:test";
import { generateCircularArrayValues } from ".";

const run = (arr: number[], startIndex: number, jumps: number[]) => {
	const generator = generateCircularArrayValues(arr, startIndex);
	return [
		generator.next().value,
		...jumps.map((jump) => generator.next(jump).value),
	];
};

describe("2757. Generate Circular Array Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(run([1, 2, 3, 4, 5], 0, [1, 2, 6])).toEqual([1, 2, 4, 5]);
		expect(run([10, 11, 12, 13, 14, 15], 1, [-1, -5, 2])).toEqual([
			11, 10, 11, 13,
		]);
		expect(run([2, 4, 6, 7, 8, 10], 3, [-4, 5, -3, 10])).toEqual([
			7, 10, 8, 4, 10,
		]);
	});

	it("wraps big jumps in both directions", () => {
		expect(run([1, 2, 3], 2, [-100, 100])).toEqual([3, 2, 3]);
	});
});
