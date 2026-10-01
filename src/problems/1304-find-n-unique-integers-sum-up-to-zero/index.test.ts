import { describe, expect, it } from "bun:test";
import { findNUniqueIntegersSumUpToZero as sumZero } from ".";

const expectValid = (n: number) => {
	const result = sumZero(n);
	expect(result).toHaveLength(n);
	expect(new Set(result).size).toBe(n);
	expect(result.reduce((sum, value) => sum + value, 0)).toBe(0);
};

describe("1304. Find N Unique Integers Sum up to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expectValid(5);
		expectValid(3);
		expect(sumZero(1)).toEqual([0]);
	});

	it("works for every n up to 1000", () => {
		for (let n = 1; n <= 1000; n++) expectValid(n);
	});
});
