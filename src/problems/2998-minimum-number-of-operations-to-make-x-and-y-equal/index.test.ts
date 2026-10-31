import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeXAndYEqual as minimumOperationsToMakeEqual } from ".";

describe("2998. Minimum Number of Operations to Make X and Y Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperationsToMakeEqual(26, 1)).toBe(3);
		expect(minimumOperationsToMakeEqual(54, 2)).toBe(4);
		expect(minimumOperationsToMakeEqual(25, 30)).toBe(5);
	});
});
