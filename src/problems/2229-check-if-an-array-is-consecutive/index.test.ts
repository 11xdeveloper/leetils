import { describe, expect, it } from "bun:test";
import { checkIfAnArrayIsConsecutive as isConsecutive } from ".";

describe("2229. Check if an Array Is Consecutive", () => {
	it("solves the examples from the problem statement", () => {
		expect(isConsecutive([1, 3, 4, 2])).toBeTrue();
		expect(isConsecutive([1, 3])).toBeFalse();
		expect(isConsecutive([3, 5, 4])).toBeTrue();
	});

	it("rejects duplicates", () => {
		expect(isConsecutive([1, 1, 3])).toBeFalse();
	});
});
