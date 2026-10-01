import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToArriveAtDestination as countPaths } from ".";

/** Enumerates every simple path and counts those of minimum length. */
const byBruteForce = (n: number, roads: number[][]): number => {
	const lengths: number[] = [];
	const walk = (node: number, visited: Set<number>, length: number) => {
		if (node === n - 1) {
			lengths.push(length);
			return;
		}
		for (const [u, v, t = 0] of roads) {
			const next = u === node ? v : v === node ? u : undefined;
			if (next === undefined || visited.has(next)) continue;
			walk(next, new Set(visited).add(next), length + t);
		}
	};
	walk(0, new Set([0]), 0);
	const shortest = Math.min(...lengths);
	return lengths.filter((l) => l === shortest).length;
};

describe("1976. Number of Ways to Arrive at Destination", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPaths(7, [
				[0, 6, 7],
				[0, 1, 2],
				[1, 2, 3],
				[1, 3, 3],
				[6, 3, 3],
				[3, 5, 1],
				[6, 5, 1],
				[2, 5, 1],
				[0, 4, 5],
				[4, 6, 2],
			]),
		).toBe(4);
		expect(countPaths(2, [[1, 0, 10]])).toBe(1);
	});

	it("matches enumerating every path on random connected graphs", () => {
		const random = createRandom(1976);
		for (let run = 0; run < 150; run++) {
			const n = random.int(2, 6);
			const seen = new Set<string>();
			const roads: number[][] = [];
			const add = (u: number, v: number) => {
				const key = `${Math.min(u, v)},${Math.max(u, v)}`;
				if (u === v || seen.has(key)) return;
				seen.add(key);
				roads.push([u, v, random.int(1, 3)]);
			};
			for (let v = 1; v < n; v++) add(random.int(0, v - 1), v);
			for (let extra = random.int(0, 5); extra > 0; extra--)
				add(random.int(0, n - 1), random.int(0, n - 1));
			expect(countPaths(n, roads)).toBe(byBruteForce(n, roads));
		}
	});
});
