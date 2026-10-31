import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLastMarkedNodesInTree as lastMarkedNodes } from ".";

/** Every node's largest distance to any other node. */
const eccentricity = (
	edges: number[][],
): ((from: number, to: number) => number)[] => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const dist = Array.from({ length: n }, (_, s) => {
		const d = new Array<number>(n).fill(-1);
		d[s] = 0;
		const q = [s];
		for (let i = 0; i < q.length; i++)
			for (const next of adjacent[q[i] ?? 0] ?? [])
				if (d[next] === -1) {
					d[next] = (d[q[i] ?? 0] ?? 0) + 1;
					q.push(next);
				}
		return d;
	});
	return [
		(from, to) => dist[from]?.[to] ?? 0,
		(from) => Math.max(...(dist[from] ?? [])),
	];
};

describe("3313. Find the Last Marked Nodes in Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastMarkedNodes([[0, 1]])).toEqual([1, 0]);
		const result = lastMarkedNodes([
			[0, 1],
			[0, 2],
		]);
		expect(result[0] === 1 || result[0] === 2).toBeTrue();
		expect(result.slice(1)).toEqual([2, 1]);
	});

	it("always picks a farthest node on random trees", () => {
		const random = createRandom(3313);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const [distance, farthest] = eccentricity(edges);
			lastMarkedNodes(edges).forEach((last, node) => {
				expect(distance?.(node, last)).toBe(farthest?.(node, 0));
			});
		}
	});
});
