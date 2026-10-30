import { describe, expect, it } from "bun:test";
import { countTheNumberOfCompleteComponents as countCompleteComponents } from ".";

describe("2685. Count the Number of Complete Components", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countCompleteComponents(6, [
				[0, 1],
				[0, 2],
				[1, 2],
				[3, 4],
			]),
		).toBe(3);
		expect(
			countCompleteComponents(6, [
				[0, 1],
				[0, 2],
				[1, 2],
				[3, 4],
				[3, 5],
			]),
		).toBe(1);
	});
});
