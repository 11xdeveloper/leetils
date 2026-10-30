import { describe, expect, it } from "bun:test";
import { findThePivotInteger as pivotInteger } from ".";

describe("2485. Find the Pivot Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(pivotInteger(8)).toBe(6);
		expect(pivotInteger(1)).toBe(1);
		expect(pivotInteger(4)).toBe(-1);
	});
});
