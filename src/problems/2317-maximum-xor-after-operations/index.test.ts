import { describe, expect, it } from "bun:test";
import { maximumXorAfterOperations as maximumXOR } from ".";

describe("2317. Maximum XOR After Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumXOR([3, 2, 4, 6])).toBe(7);
		expect(maximumXOR([1, 2, 3, 9, 2])).toBe(11);
	});
});
