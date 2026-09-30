import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reachableNodesInSubdividedGraph as reachableNodes } from ".";

/** Builds the subdivided graph explicitly and runs a breadth-first search. */
const bySubdividing = (
	edges: number[][],
	maxMoves: number,
	n: number,
): number => {
	const adjacency = new Map<number, number[]>();
	const link = (a: number, b: number) => {
		adjacency.set(a, [...(adjacency.get(a) ?? []), b]);
		adjacency.set(b, [...(adjacency.get(b) ?? []), a]);
	};
	let next = n;
	for (const [u = 0, v = 0, count = 0] of edges) {
		let previous = u;
		for (let i = 0; i < count; i++) {
			link(previous, next);
			previous = next++;
		}
		link(previous, v);
	}
	const distance = new Map([[0, 0]]);
	const queue = [0];
	for (const node of queue) {
		if ((distance.get(node) ?? 0) === maxMoves) continue;
		for (const neighbour of adjacency.get(node) ?? []) {
			if (distance.has(neighbour)) continue;
			distance.set(neighbour, (distance.get(node) ?? 0) + 1);
			queue.push(neighbour);
		}
	}
	return distance.size;
};

describe("882. Reachable Nodes In Subdivided Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			reachableNodes(
				[
					[0, 1, 10],
					[0, 2, 1],
					[1, 2, 2],
				],
				6,
				3,
			),
		).toBe(13);
		expect(
			reachableNodes(
				[
					[0, 1, 4],
					[1, 2, 6],
					[0, 2, 8],
					[1, 3, 1],
				],
				10,
				4,
			),
		).toBe(23);
		expect(
			reachableNodes(
				[
					[1, 2, 4],
					[1, 4, 5],
					[1, 3, 1],
					[2, 3, 4],
					[3, 4, 5],
				],
				17,
				5,
			),
		).toBe(1);
	});

	it("matches searching the subdivided graph on random inputs", () => {
		const random = createRandom(882);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 6);
			const pairs = new Map<string, number[]>();
			for (let e = random.int(0, 8); e > 0; e--) {
				const [u, v] = [random.int(0, n - 1), random.int(0, n - 1)];
				if (u !== v)
					pairs.set([Math.min(u, v), Math.max(u, v)].join(), [
						u,
						v,
						random.int(0, 5),
					]);
			}
			const edges = [...pairs.values()];
			const maxMoves = random.int(0, 15);
			expect(reachableNodes(edges, maxMoves, n)).toBe(
				bySubdividing(edges, maxMoves, n),
			);
		}
	});
});
