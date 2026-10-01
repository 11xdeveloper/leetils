import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfAcceptedInvitations as maximumInvitations } from ".";

/** Dynamic programming over which girls are taken, boy by boy. */
const byBruteForce = (grid: number[][]): number => {
	const n = grid[0]?.length ?? 0;
	let best = new Map([[0, 0]]);
	for (const row of grid) {
		const next = new Map(best);
		for (const [taken, count] of best) {
			for (let girl = 0; girl < n; girl++) {
				if (row[girl] !== 1 || taken & (1 << girl)) continue;
				const mask = taken | (1 << girl);
				next.set(mask, Math.max(next.get(mask) ?? 0, count + 1));
			}
		}
		best = next;
	}
	return Math.max(...best.values());
};

describe("1820. Maximum Number of Accepted Invitations", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumInvitations([
				[1, 1, 1],
				[1, 0, 1],
				[0, 0, 1],
			]),
		).toBe(3);
		expect(
			maximumInvitations([
				[1, 0, 1, 0],
				[1, 0, 0, 0],
				[0, 0, 1, 0],
				[1, 1, 1, 0],
			]),
		).toBe(3);
	});

	it("matches a dynamic program over girls on random grids", () => {
		const random = createRandom(1820);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 7), random.int(1, 7)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 1));
			expect(maximumInvitations(grid)).toBe(byBruteForce(grid));
		}
	});
});
