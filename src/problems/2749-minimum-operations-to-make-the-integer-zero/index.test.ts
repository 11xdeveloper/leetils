import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeTheIntegerZero as makeTheIntegerZero } from ".";

describe("2749. Minimum Operations to Make the Integer Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeTheIntegerZero(3, -2)).toBe(3);
		expect(makeTheIntegerZero(5, 7)).toBe(-1);
	});
});
