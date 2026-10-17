import { describe, expect, it } from "bun:test";
import { pathsInMazeThatLeadToSameRoom as confusionScore } from ".";

describe("2077. Paths in Maze That Lead to Same Room", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			confusionScore(5, [
				[1, 2],
				[5, 2],
				[4, 1],
				[2, 4],
				[3, 1],
				[3, 4],
			]),
		).toBe(2);
		expect(
			confusionScore(4, [
				[1, 2],
				[3, 4],
			]),
		).toBe(0);
	});

	it("counts every triangle of a complete graph", () => {
		const corridors: number[][] = [];
		for (let a = 1; a <= 5; a++)
			for (let b = a + 1; b <= 5; b++) corridors.push([b, a]);
		expect(confusionScore(5, corridors)).toBe(10);
	});
});
