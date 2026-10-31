import { describe, expect, it } from "bun:test";
import { minimumOperationsToWriteTheLetterYOnAGrid as minimumOperationsToWriteY } from ".";

describe("3071. Minimum Operations to Write the Letter Y on a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumOperationsToWriteY([
				[1, 2, 2],
				[1, 1, 0],
				[0, 1, 0],
			]),
		).toBe(3);
		expect(
			minimumOperationsToWriteY([
				[0, 1, 0, 1, 0],
				[2, 1, 0, 1, 2],
				[2, 2, 2, 0, 1],
				[2, 2, 2, 2, 2],
				[2, 1, 2, 2, 2],
			]),
		).toBe(12);
	});
});
