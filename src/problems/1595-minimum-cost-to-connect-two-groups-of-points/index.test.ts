import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToConnectTwoGroupsOfPoints as connectTwoGroups } from ".";

/** Tries every set of connections. */
const byBruteForce = (cost: number[][]): number => {
	const [m, n] = [cost.length, cost[0]?.length ?? 0];
	let best = Infinity;
	for (let mask = 0; mask < 2 ** (m * n); mask++) {
		const used = (i: number, j: number) => (mask >> (i * n + j)) & 1;
		const rowsOk = cost.every((_, i) =>
			Array.from({ length: n }, (_, j) => used(i, j)).some(Boolean),
		);
		const colsOk = Array.from({ length: n }, (_, j) =>
			cost.some((_, i) => used(i, j)),
		).every(Boolean);
		if (!rowsOk || !colsOk) continue;
		let total = 0;
		for (let i = 0; i < m; i++)
			for (let j = 0; j < n; j++) if (used(i, j)) total += cost[i]?.[j] ?? 0;
		best = Math.min(best, total);
	}
	return best;
};

describe("1595. Minimum Cost to Connect Two Groups of Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			connectTwoGroups([
				[15, 96],
				[36, 2],
			]),
		).toBe(17);
		expect(
			connectTwoGroups([
				[1, 3, 5],
				[4, 1, 1],
				[1, 5, 3],
			]),
		).toBe(4);
		expect(
			connectTwoGroups([
				[2, 5, 1],
				[3, 4, 7],
				[8, 1, 2],
				[6, 2, 4],
				[3, 8, 8],
			]),
		).toBe(10);
	});

	it("matches trying every set of connections on small random inputs", () => {
		const random = createRandom(1595);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 3);
			const m = random.int(n, 4);
			if (m * n > 12) continue;
			const cost = Array.from({ length: m }, () => random.array(n, 0, 20));
			expect(connectTwoGroups(cost)).toBe(byBruteForce(cost));
		}
	});
});
