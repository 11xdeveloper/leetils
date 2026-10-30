import { describe, expect, it } from "bun:test";
import { deleteGreatestValueInEachRow as deleteGreatestValue } from ".";

describe("2500. Delete Greatest Value in Each Row", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			deleteGreatestValue([
				[1, 2, 4],
				[3, 3, 1],
			]),
		).toBe(8);
		expect(deleteGreatestValue([[10]])).toBe(10);
	});
});
