import { describe, expect, it } from "bun:test";
import { uniqueMiddleElement as isMiddleElementUnique } from ".";

describe("3978. Unique Middle Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(isMiddleElementUnique([1, 2, 3])).toBeTrue();
		expect(isMiddleElementUnique([1, 2, 2])).toBeFalse();
	});
});
