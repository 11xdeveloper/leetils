import { describe, expect, it } from "bun:test";
import { maximumHeightOfATriangle as maxHeightOfTriangle } from ".";

describe("3200. Maximum Height of a Triangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxHeightOfTriangle(2, 4)).toBe(3);
		expect(maxHeightOfTriangle(2, 1)).toBe(2);
		expect(maxHeightOfTriangle(1, 1)).toBe(1);
		expect(maxHeightOfTriangle(10, 1)).toBe(2);
	});
});
