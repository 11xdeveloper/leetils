import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToCollectAllApplesInATree as minTime } from ".";

/** Walks up from every apple, marking the edges on its path to the root. */
const byBruteForce = (
	n: number,
	edges: number[][],
	hasApple: boolean[],
): number => {
	const neighbours = Array.from({ length: n }, (): number[] => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = new Array<number>(n).fill(-1);
	const visit = (v: number, from: number): void => {
		for (const next of neighbours[v] ?? []) {
			if (next === from) continue;
			parent[next] = v;
			visit(next, v);
		}
	};
	visit(0, -1);
	const used = new Set<number>();
	hasApple.forEach((apple, v) => {
		for (let at = v; apple && at !== 0; at = parent[at] ?? 0) used.add(at);
	});
	return 2 * used.size;
};

describe("1443. Minimum Time to Collect All Apples in a Tree", () => {
	const edges = [
		[0, 1],
		[0, 2],
		[1, 4],
		[1, 5],
		[2, 3],
		[2, 6],
	];

	it("solves the examples from the problem statement", () => {
		expect(
			minTime(7, edges, [false, false, true, false, true, true, false]),
		).toBe(8);
		expect(
			minTime(7, edges, [false, false, true, false, false, true, false]),
		).toBe(6);
		expect(minTime(7, edges, new Array<boolean>(7).fill(false))).toBe(0);
	});

	it("handles edges listed away from the root", () => {
		expect(
			minTime(
				4,
				[
					[0, 2],
					[0, 3],
					[1, 2],
				],
				[false, true, false, false],
			),
		).toBe(4);
	});

	it("matches marking paths to the root on random trees", () => {
		const random = createRandom(1443);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const labels = [
				0,
				...Array.from({ length: n - 1 }, (_, i) => i + 1).sort(
					() => random.next() - 0.5,
				),
			];
			const tree = Array.from({ length: n - 1 }, (_, i) => {
				const [a = 0, b = 0] = [labels[random.int(0, i)], labels[i + 1]];
				return [Math.min(a, b), Math.max(a, b)];
			});
			const hasApple = Array.from({ length: n }, () => random.next() < 0.3);
			expect(minTime(n, tree, hasApple)).toBe(byBruteForce(n, tree, hasApple));
		}
	});
});
