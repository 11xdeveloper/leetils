import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToReachDestinationInTheGrid as numberOfWays } from ".";

/** Counts walks cell by cell. */
const byBruteForce = (
	n: number,
	m: number,
	k: number,
	source: number[],
	dest: number[],
): number => {
	let ways = Array.from({ length: n + 1 }, () =>
		Array.from({ length: m + 1 }, () => 0),
	);
	(ways[source[0] ?? 1] ?? [])[source[1] ?? 1] = 1;
	for (let step = 0; step < k; step++) {
		const next = Array.from({ length: n + 1 }, () =>
			Array.from({ length: m + 1 }, () => 0),
		);
		for (let r = 1; r <= n; r++)
			for (let c = 1; c <= m; c++) {
				const here = ways[r]?.[c] ?? 0;
				if (!here) continue;
				for (let c2 = 1; c2 <= m; c2++)
					if (c2 !== c) (next[r] ?? [])[c2] = (next[r]?.[c2] ?? 0) + here;
				for (let r2 = 1; r2 <= n; r2++)
					if (r2 !== r) (next[r2] ?? [])[c] = (next[r2]?.[c] ?? 0) + here;
			}
		ways = next;
	}
	return ways[dest[0] ?? 1]?.[dest[1] ?? 1] ?? 0;
};

describe("2912. Number of Ways to Reach Destination in the Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays(3, 2, 2, [1, 1], [2, 2])).toBe(2);
		expect(numberOfWays(3, 4, 3, [1, 2], [2, 3])).toBe(9);
	});

	it("matches counting walks cell by cell on random grids", () => {
		const random = createRandom(2912);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 4);
			const m = random.int(2, 4);
			const k = random.int(1, 5);
			const source = [random.int(1, n), random.int(1, m)];
			const dest = [random.int(1, n), random.int(1, m)];
			expect(numberOfWays(n, m, k, source, dest)).toBe(
				byBruteForce(n, m, k, source, dest),
			);
		}
	});
});
