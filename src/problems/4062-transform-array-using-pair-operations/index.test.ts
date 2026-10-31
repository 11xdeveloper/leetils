import { describe, expect, it } from "bun:test";
import { transformArrayUsingPairOperations as canTransform } from ".";

describe("4062. Transform Array Using Pair Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(canTransform([1, 2, 3], [0, 2, 4])).toBeTrue();
		expect(canTransform([-5, -5], [-15, 5])).toBeTrue();
		expect(canTransform([1, 2, 1], [0, 2, 5])).toBeFalse();
	});
});
