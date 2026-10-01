import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestColorValueInADirectedGraph as largestPathValue } from ".";

describe("1857. Largest Color Value in a Directed Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestPathValue("abaca", [
				[0, 1],
				[0, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(3);
		expect(largestPathValue("a", [[0, 0]])).toBe(-1);
	});

	it("matches walking every path on random acyclic graphs", () => {
		const random = createRandom(1857);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const colors = random.string(n, "abc");
			const edges: number[][] = [];
			for (let u = 0; u < n; u++)
				for (let v = u + 1; v < n; v++)
					if (random.int(0, 2) === 0) edges.push([u, v]);
			let best = 0;
			const walk = (node: number, counts: Map<string, number>) => {
				const color = colors[node] ?? "";
				const next = new Map(counts).set(color, (counts.get(color) ?? 0) + 1);
				best = Math.max(best, ...next.values());
				for (const [u, v = 0] of edges) if (u === node) walk(v, next);
			};
			for (let node = 0; node < n; node++) walk(node, new Map());
			expect(largestPathValue(colors, edges)).toBe(best);
			if (n > 1)
				expect(
					largestPathValue(colors, [...edges, [n - 1, 0], [0, n - 1]]),
				).toBe(-1);
		}
	});
});
