import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countValidPathsInATree as countPaths } from ".";

/** Walks every path. */
const byBruteForce = (n: number, edges: number[][]): number => {
	const prime = (x: number): boolean => {
		if (x < 2) return false;
		for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
		return true;
	};
	const neighbours: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	let count = 0;
	for (let start = 1; start <= n; start++) {
		const primes = new Map([[start, prime(start) ? 1 : 0]]);
		const stack = [start];
		for (let node = stack.pop(); node !== undefined; node = stack.pop())
			for (const next of neighbours[node] ?? [])
				if (!primes.has(next)) {
					primes.set(next, (primes.get(node) ?? 0) + (prime(next) ? 1 : 0));
					stack.push(next);
				}
		for (const [end, onPath] of primes)
			if (end > start && onPath === 1) count++;
	}
	return count;
};

describe("2867. Count Valid Paths in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPaths(5, [
				[1, 2],
				[1, 3],
				[2, 4],
				[2, 5],
			]),
		).toBe(4);
		expect(
			countPaths(6, [
				[1, 2],
				[1, 3],
				[2, 4],
				[3, 5],
				[3, 6],
			]),
		).toBe(6);
	});

	it("matches walking every path on random trees", () => {
		const random = createRandom(2867);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 14);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(1, i + 1),
				i + 2,
			]);
			expect(countPaths(n, edges)).toBe(byBruteForce(n, edges));
		}
	});
});
