import { describe, expect, it } from "bun:test";
import {
	GraphNode,
	graphFromAdjacencyList,
	graphToAdjacencyList,
} from "./graph-node";

describe("GraphNode", () => {
	it("defaults to a node holding 0 with no neighbors", () => {
		const node = new GraphNode();
		expect(node.val).toBe(0);
		expect(node.neighbors).toEqual([]);
	});
});

describe("graphFromAdjacencyList", () => {
	it("links nodes numbered from 1", () => {
		const node = graphFromAdjacencyList([
			[2, 4],
			[1, 3],
			[2, 4],
			[1, 3],
		]);
		expect(node?.val).toBe(1);
		expect(node?.neighbors.map((n) => n.val)).toEqual([2, 4]);
		expect(node?.neighbors[0]?.neighbors[0]).toBe(node ?? undefined);
	});

	it("returns null for an empty list", () => {
		expect(graphFromAdjacencyList([])).toBeNull();
	});
});

describe("graphToAdjacencyList", () => {
	it("round-trips with graphFromAdjacencyList", () => {
		for (const adjList of [
			[],
			[[]],
			[[2], [1]],
			[
				[2, 4],
				[1, 3],
				[2, 4],
				[1, 3],
			],
			[
				[2, 3],
				[1, 3],
				[1, 2],
			],
		]) {
			expect(graphToAdjacencyList(graphFromAdjacencyList(adjList))).toEqual(
				adjList,
			);
		}
	});
});
