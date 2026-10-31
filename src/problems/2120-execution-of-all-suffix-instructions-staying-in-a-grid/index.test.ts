import { describe, expect, it } from "bun:test";
import { executionOfAllSuffixInstructionsStayingInAGrid as executeInstructions } from ".";

describe("2120. Execution of All Suffix Instructions Staying in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(executeInstructions(3, [0, 1], "RRDDLU")).toEqual([
			1, 5, 4, 3, 1, 0,
		]);
		expect(executeInstructions(2, [1, 1], "LURD")).toEqual([4, 1, 0, 0]);
		expect(executeInstructions(1, [0, 0], "LRUD")).toEqual([0, 0, 0, 0]);
	});
});
