import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { catAndMouse } from ".";

/** Repeatedly decides states whose outcome follows from their successors until nothing changes. */
const byIteration = (graph: number[][]): number => {
	const n = graph.length;
	const result = new Map<string, number>();
	const key = (m: number, c: number, t: number) => `${m},${c},${t}`;
	for (let c = 1; c < n; c++) {
		for (const t of [0, 1]) {
			result.set(key(0, c, t), 1);
			result.set(key(c, c, t), 2);
		}
	}
	for (let changed = true; changed; ) {
		changed = false;
		for (let m = 0; m < n; m++) {
			for (let c = 1; c < n; c++) {
				for (const t of [0, 1]) {
					if (result.has(key(m, c, t))) continue;
					const outcomes =
						t === 0
							? (graph[m] ?? []).map((next) => result.get(key(next, c, 1)))
							: (graph[c] ?? [])
									.filter((next) => next !== 0)
									.map((next) => result.get(key(m, next, 0)));
					const mine = t === 0 ? 1 : 2;
					const theirs = t === 0 ? 2 : 1;
					let decided: number | undefined;
					if (outcomes.includes(mine)) decided = mine;
					else if (outcomes.every((outcome) => outcome === theirs))
						decided = theirs;
					if (decided !== undefined) {
						result.set(key(m, c, t), decided);
						changed = true;
					}
				}
			}
		}
	}
	return result.get(key(1, 2, 0)) ?? 0;
};

describe("913. Cat and Mouse", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			catAndMouse([[2, 5], [3], [0, 4, 5], [1, 4, 5], [2, 3], [0, 2, 3]]),
		).toBe(0);
		expect(catAndMouse([[1, 3], [0], [3], [0, 2]])).toBe(1);
	});

	it("matches iterating to a fixed point on random graphs", () => {
		const random = createRandom(913);
		for (let run = 0; run < 300; run++) {
			const n = random.int(3, 7);
			const graph: number[][] = Array.from({ length: n }, () => []);
			for (let edges = random.int(n, 2 * n); edges > 0; edges--) {
				const [a, b] = [random.int(0, n - 1), random.int(0, n - 1)];
				if (a === b || graph[a]?.includes(b)) continue;
				graph[a]?.push(b);
				graph[b]?.push(a);
			}
			// The mouse and cat each need somewhere to move.
			if (graph.some((neighbours, node) => node > 0 && neighbours.length === 0))
				continue;
			if ((graph[2] ?? []).every((next) => next === 0)) continue;
			expect(catAndMouse(graph)).toBe(byIteration(graph));
		}
	});
});
