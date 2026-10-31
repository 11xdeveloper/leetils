import { describe, expect, it } from "bun:test";
import { createComponentsWithSameValue as componentValue } from ".";

describe("2440. Create Components With Same Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			componentValue(
				[6, 2, 2, 2, 6],
				[
					[0, 1],
					[1, 2],
					[1, 3],
					[3, 4],
				],
			),
		).toBe(2);
		expect(componentValue([2], [])).toBe(0);
	});

	it("cuts every edge when all values match", () => {
		expect(
			componentValue(
				[3, 3, 3],
				[
					[0, 1],
					[1, 2],
				],
			),
		).toBe(2);
	});
});
