import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { redundantConnection as findRedundantConnection } from ".";

/** The last edge whose removal leaves every node connected. */
const byRemoval = (edges: number[][]): number[] => {
	const n = edges.length;
	for (let skip = edges.length - 1; skip >= 0; skip--) {
		const reached = new Set([1]);
		const queue = [1];
		for (const node of queue) {
			for (const [i, [a = 0, b = 0]] of edges.entries()) {
				if (i === skip) continue;
				const other = a === node ? b : b === node ? a : 0;
				if (other && !reached.has(other)) {
					reached.add(other);
					queue.push(other);
				}
			}
		}
		if (reached.size === n) return edges[skip] ?? [];
	}
	return [];
};

describe("684. Redundant Connection", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findRedundantConnection([
				[1, 2],
				[1, 3],
				[2, 3],
			]),
		).toEqual([2, 3]);
		expect(
			findRedundantConnection([
				[1, 2],
				[2, 3],
				[3, 4],
				[1, 4],
				[1, 5],
			]),
		).toEqual([1, 4]);
	});

	it("matches trying each removal on random graphs", () => {
		const random = createRandom(684);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(3, 9);
			const edges: number[][] = [];
			for (let node = 2; node <= n; node++)
				edges.push([random.int(1, node - 1), node]);
			let a = random.int(1, n);
			let b = random.int(1, n);
			while (
				a === b ||
				edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a))
			)
				[a, b] = [random.int(1, n), random.int(1, n)];
			edges.push([Math.min(a, b), Math.max(a, b)]);
			edges.sort(() => random.next() - 0.5);
			expect(findRedundantConnection(edges)).toEqual(byRemoval(edges));
		}
	});
});
