import { describe, expect, it } from "bun:test";
import { nodeWithHighestEdgeScore as edgeScore } from ".";

describe("2374. Node With Highest Edge Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(edgeScore([1, 0, 0, 0, 0, 7, 7, 5])).toBe(7);
		expect(edgeScore([2, 0, 0, 2])).toBe(0);
	});
});
