import { describe, expect, it } from "bun:test";
import { containsDuplicate } from ".";

describe("217. Contains Duplicate", () => {
	it("solves the examples from the problem statement", () => {
		expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
		expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
		expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true);
	});

	it("handles a single element", () => {
		expect(containsDuplicate([1])).toBe(false);
	});

	it("finds duplicates wherever they are", () => {
		expect(containsDuplicate([1, 1, 2, 3])).toBe(true);
		expect(containsDuplicate([1, 2, 3, 3])).toBe(true);
		expect(containsDuplicate([5, 1, 2, 5])).toBe(true);
	});

	it("handles negative numbers, zero and large values", () => {
		expect(containsDuplicate([-1, 1, 0])).toBe(false);
		expect(containsDuplicate([-1, -1])).toBe(true);
		expect(containsDuplicate([0, 0])).toBe(true);
		expect(containsDuplicate([1e9, -1e9, 1e9])).toBe(true);
	});
});
