import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { connectingCitiesWithMinimumCost as minimumCost } from ".";

/** Tries every subset of connections. */
const byBruteForce = (n: number, connections: number[][]): number => {
	let best = Infinity;
	for (let subset = 0; subset < 2 ** connections.length; subset++) {
		const chosen = connections.filter((_, i) => subset & (1 << i));
		const reached = new Set([1]);
		for (let grew = true; grew; ) {
			grew = false;
			for (const [x = 0, y = 0] of chosen) {
				if (reached.has(x) === reached.has(y)) continue;
				reached.add(x);
				reached.add(y);
				grew = true;
			}
		}
		if (reached.size === n) {
			best = Math.min(
				best,
				chosen.reduce((sum, [, , cost = 0]) => sum + cost, 0),
			);
		}
	}
	return best === Infinity ? -1 : best;
};

describe("1135. Connecting Cities With Minimum Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(3, [
				[1, 2, 5],
				[1, 3, 6],
				[2, 3, 1],
			]),
		).toBe(6);
		expect(
			minimumCost(4, [
				[1, 2, 3],
				[3, 4, 4],
			]),
		).toBe(-1);
	});

	it("needs no connections for a single city", () => {
		expect(minimumCost(1, [[1, 1, 5]])).toBe(0);
	});

	it("matches trying every subset of connections on random inputs", () => {
		const random = createRandom(1135);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 6);
			const connections = Array.from({ length: random.int(1, 9) }, () => {
				const x = random.int(1, n);
				const y = ((x + random.int(0, n - 2)) % n) + 1;
				return [x, y, random.int(0, 20)];
			});
			expect(minimumCost(n, connections)).toBe(byBruteForce(n, connections));
		}
	});
});
