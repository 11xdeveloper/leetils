import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countServersThatCommunicate as countServers } from ".";

/** Looks for a partner for every server. */
const byBruteForce = (grid: number[][]): number => {
	const servers = grid.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell ? [[r, c]] : [])),
	);
	return servers.filter(([r, c], i) =>
		servers.some(([r2, c2], j) => i !== j && (r === r2 || c === c2)),
	).length;
};

describe("1267. Count Servers that Communicate", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countServers([
				[1, 0],
				[0, 1],
			]),
		).toBe(0);
		expect(
			countServers([
				[1, 0],
				[1, 1],
			]),
		).toBe(3);
		expect(
			countServers([
				[1, 1, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1],
			]),
		).toBe(4);
	});

	it("matches looking for partners on random grids", () => {
		const random = createRandom(1267);
		for (let run = 0; run < 300; run++) {
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				Array.from({ length: 5 }, () => (random.next() < 0.3 ? 1 : 0)),
			);
			expect(countServers(grid)).toBe(byBruteForce(grid));
		}
	});
});
