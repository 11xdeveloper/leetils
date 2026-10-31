import { describe, expect, it } from "bun:test";
import { shortestDistanceAfterRoadAdditionQueriesI as shortestDistanceAfterQueries } from ".";

describe("3243. Shortest Distance After Road Addition Queries I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestDistanceAfterQueries(5, [
				[2, 4],
				[0, 2],
				[0, 4],
			]),
		).toEqual([3, 2, 1]);
		expect(
			shortestDistanceAfterQueries(4, [
				[0, 3],
				[0, 2],
			]),
		).toEqual([1, 1]);
	});

	it("handles crossing roads", () => {
		expect(
			shortestDistanceAfterQueries(6, [
				[0, 3],
				[2, 5],
				[1, 4],
			]),
		).toEqual([3, 3, 3]);
	});
});
