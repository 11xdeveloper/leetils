import { describe, expect, it } from "bun:test";
import { distanceToACycleInUndirectedGraph as distanceToCycle } from ".";

describe("2204. Distance to a Cycle in Undirected Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			distanceToCycle(7, [
				[1, 2],
				[2, 4],
				[4, 3],
				[3, 1],
				[0, 1],
				[5, 2],
				[6, 5],
			]),
		).toEqual([1, 0, 0, 0, 0, 1, 2]);
		expect(
			distanceToCycle(9, [
				[0, 1],
				[1, 2],
				[0, 2],
				[2, 6],
				[6, 7],
				[6, 8],
				[0, 3],
				[3, 4],
				[3, 5],
			]),
		).toEqual([0, 0, 0, 1, 2, 2, 1, 2, 2]);
	});
});
