import { describe, expect, it } from "bun:test";
import { baseballGame as calPoints } from ".";

describe("682. Baseball Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(calPoints(["5", "2", "C", "D", "+"])).toBe(30);
		expect(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"])).toBe(27);
		expect(calPoints(["1", "C"])).toBe(0);
	});
});
