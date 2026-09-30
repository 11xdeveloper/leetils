import { describe, expect, it } from "bun:test";
import { countingElements as countElements } from ".";

describe("1426. Counting Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(countElements([1, 2, 3])).toBe(2);
		expect(countElements([1, 1, 3, 3, 5, 5, 7, 7])).toBe(0);
	});

	it("counts duplicates separately", () => {
		expect(countElements([1, 1, 2])).toBe(2);
		expect(countElements([1, 2, 2])).toBe(1);
	});
});
