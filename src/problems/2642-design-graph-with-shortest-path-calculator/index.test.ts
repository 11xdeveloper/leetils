import { describe, expect, it } from "bun:test";
import { DesignGraphWithShortestPathCalculator as Graph } from ".";

describe("2642. Design Graph With Shortest Path Calculator", () => {
	it("solves the example from the problem statement", () => {
		const graph = new Graph(4, [
			[0, 2, 5],
			[0, 1, 2],
			[1, 2, 1],
			[3, 0, 3],
		]);
		expect(graph.shortestPath(3, 2)).toBe(6);
		expect(graph.shortestPath(0, 3)).toBe(-1);
		graph.addEdge([1, 3, 4]);
		expect(graph.shortestPath(0, 3)).toBe(6);
	});
});
