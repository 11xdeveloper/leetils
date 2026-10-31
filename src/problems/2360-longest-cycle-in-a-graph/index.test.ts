import { describe, expect, it } from "bun:test";
import { longestCycleInAGraph as longestCycle } from ".";

describe("2360. Longest Cycle in a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestCycle([3, 3, 4, 2, 3])).toBe(3);
		expect(longestCycle([2, -1, 3, 1])).toBe(-1);
	});

	it("doesn't count paths into earlier cycles", () => {
		expect(longestCycle([1, 0, 0, 2, 3])).toBe(2);
	});
});
