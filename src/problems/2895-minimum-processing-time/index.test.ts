import { describe, expect, it } from "bun:test";
import { minimumProcessingTime as minProcessingTime } from ".";

describe("2895. Minimum Processing Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(minProcessingTime([8, 10], [2, 2, 3, 1, 8, 7, 4, 5])).toBe(16);
		expect(minProcessingTime([10, 20], [2, 3, 1, 2, 5, 8, 4, 3])).toBe(23);
	});
});
