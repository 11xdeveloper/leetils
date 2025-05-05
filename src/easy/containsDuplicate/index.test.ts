import { describe, expect, it } from "bun:test";
import { containsDuplicate } from "./index";

describe("containsDuplicate", () => {
	it("should detect duplicates in arrays", () => {
		expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
		expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
		expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true);
	});

	it("should handle empty arrays", () => {
		expect(containsDuplicate([])).toBe(false);
	});

	it("should handle single element arrays", () => {
		expect(containsDuplicate([1])).toBe(false);
	});

	it("should handle arrays with multiple duplicates", () => {
		expect(containsDuplicate([1, 1, 1, 1])).toBe(true);
		expect(containsDuplicate([1, 2, 2, 3, 3, 3])).toBe(true);
	});

	it("should handle arrays with negative numbers", () => {
		expect(containsDuplicate([-1, -1, 1, 2])).toBe(true);
		expect(containsDuplicate([-1, 1, 2, 3])).toBe(false);
	});

	it("should handle arrays with large numbers", () => {
		expect(containsDuplicate([1000000, 1000000])).toBe(true);
		expect(containsDuplicate([1000000, 2000000])).toBe(false);
	});
});
