import { describe, expect, it } from "bun:test";
import { antOnTheBoundary } from ".";

describe("3028. Ant on the Boundary", () => {
	it("solves the examples from the problem statement", () => {
		expect(antOnTheBoundary([2, 3, -5])).toBe(1);
		expect(antOnTheBoundary([3, 2, -3, -4])).toBe(0);
	});
});
