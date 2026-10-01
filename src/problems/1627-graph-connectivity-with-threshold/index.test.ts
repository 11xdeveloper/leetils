import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { graphConnectivityWithThreshold as areConnected } from ".";

/** Builds the graph pair by pair with gcd and searches it. */
const byBruteForce = (
	n: number,
	threshold: number,
	queries: number[][],
): boolean[] => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const component = new Array<number>(n + 1).fill(0);
	for (let start = 1; start <= n; start++) {
		if (component[start]) continue;
		component[start] = start;
		const stack = [start];
		for (let city = stack.pop(); city !== undefined; city = stack.pop()) {
			for (let other = 1; other <= n; other++) {
				if (component[other] || gcd(city, other) <= threshold) continue;
				component[other] = start;
				stack.push(other);
			}
		}
	}
	return queries.map(([a = 0, b = 0]) => component[a] === component[b]);
};

describe("1627. Graph Connectivity With Threshold", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			areConnected(6, 2, [
				[1, 4],
				[2, 5],
				[3, 6],
			]),
		).toEqual([false, false, true]);
		expect(
			areConnected(6, 0, [
				[4, 5],
				[3, 4],
				[3, 2],
				[2, 6],
				[1, 3],
			]),
		).toEqual([true, true, true, true, true]);
		expect(
			areConnected(5, 1, [
				[4, 5],
				[4, 5],
				[3, 2],
				[2, 3],
				[3, 4],
			]),
		).toEqual([false, false, false, false, false]);
	});

	it("matches searching the explicit graph on random inputs", () => {
		const random = createRandom(1627);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 40);
			const threshold = random.int(0, n);
			const queries = Array.from({ length: 20 }, () => [
				random.int(1, n),
				random.int(1, n),
			]);
			expect(areConnected(n, threshold, queries)).toEqual(
				byBruteForce(n, threshold, queries),
			);
		}
	});
});
