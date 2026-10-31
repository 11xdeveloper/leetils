import { describe, expect, it } from "bun:test";
import { minimumTimeToTransportAllIndividuals as minTime } from ".";

describe("3594. Minimum Time to Transport All Individuals", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTime(1, 1, 1, [5], [1.0])).toBeCloseTo(5);
		expect(minTime(3, 2, 3, [2, 5, 8], [1.0, 1.5, 0.75])).toBeCloseTo(14.5);
		expect(minTime(2, 1, 2, [10, 10], [2.0, 2.0])).toBe(-1);
	});

	it("handles the classic four-person crossing", () => {
		expect(minTime(4, 2, 1, [1, 2, 5, 10], [1])).toBeCloseTo(17);
	});
});
