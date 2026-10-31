import { describe, expect, it } from "bun:test";
import { divideNodesIntoTheMaximumNumberOfGroups as magnificentSets } from ".";

describe("2493. Divide Nodes Into the Maximum Number of Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			magnificentSets(6, [
				[1, 2],
				[1, 4],
				[1, 5],
				[2, 6],
				[2, 3],
				[4, 6],
			]),
		).toBe(4);
		expect(
			magnificentSets(3, [
				[1, 2],
				[2, 3],
				[3, 1],
			]),
		).toBe(-1);
	});

	it("adds up separate components", () => {
		expect(magnificentSets(5, [[1, 2]])).toBe(5);
	});
});
