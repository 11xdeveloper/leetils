import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { shortestPathVisitingAllNodes as shortestPathLength } from ".";

/** Tries every order of first visits, joining them by shortest paths. */
const byOrders = (graph: number[][]): number => {
	const n = graph.length;
	const distance = graph.map((_, start) => {
		const d = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
		d[start] = 0;
		const queue = [start];
		for (const node of queue) {
			for (const next of graph[node] ?? []) {
				if (d[next] !== Number.POSITIVE_INFINITY) continue;
				d[next] = (d[node] ?? 0) + 1;
				queue.push(next);
			}
		}
		return d;
	});
	return Math.min(
		...permutations(graph.map((_, i) => i)).map((order) =>
			order
				.slice(1)
				.reduce(
					(total, node, i) => total + (distance[order[i] ?? 0]?.[node] ?? 0),
					0,
				),
		),
	);
};

describe("847. Shortest Path Visiting All Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestPathLength([[1, 2, 3], [0], [0], [0]])).toBe(4);
		expect(shortestPathLength([[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]])).toBe(
			4,
		);
		expect(shortestPathLength([[]])).toBe(0);
	});

	it("matches trying every order of visits on random connected graphs", () => {
		const random = createRandom(847);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const graph: number[][] = Array.from({ length: n }, () => []);
			const connect = (a: number, b: number) => {
				if (a === b || graph[a]?.includes(b)) return;
				graph[a]?.push(b);
				graph[b]?.push(a);
			};
			for (let node = 1; node < n; node++)
				connect(node, random.int(0, node - 1));
			for (let extra = random.int(0, n); extra > 0; extra--)
				connect(random.int(0, n - 1), random.int(0, n - 1));
			expect(shortestPathLength(graph)).toBe(byOrders(graph));
		}
	});
});
