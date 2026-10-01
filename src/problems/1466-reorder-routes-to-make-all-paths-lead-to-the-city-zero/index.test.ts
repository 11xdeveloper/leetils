import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reorderRoutesToMakeAllPathsLeadToTheCityZero as minReorder } from ".";

/** Counts roads whose start is closer to city 0 than their end. */
const byBruteForce = (n: number, connections: number[][]): number => {
	const depth = new Array<number>(n).fill(-1);
	depth[0] = 0;
	for (let changed = true; changed; ) {
		changed = false;
		for (const [a = 0, b = 0] of connections) {
			if (depth[a] !== -1 && depth[b] === -1)
				[depth[b], changed] = [(depth[a] ?? 0) + 1, true];
			if (depth[b] !== -1 && depth[a] === -1)
				[depth[a], changed] = [(depth[b] ?? 0) + 1, true];
		}
	}
	return connections.filter(
		([a = 0, b = 0]) => (depth[a] ?? 0) < (depth[b] ?? 0),
	).length;
};

describe("1466. Reorder Routes to Make All Paths Lead to the City Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minReorder(6, [
				[0, 1],
				[1, 3],
				[2, 3],
				[4, 0],
				[4, 5],
			]),
		).toBe(3);
		expect(
			minReorder(5, [
				[1, 0],
				[1, 2],
				[3, 2],
				[3, 4],
			]),
		).toBe(2);
		expect(
			minReorder(3, [
				[1, 0],
				[2, 0],
			]),
		).toBe(0);
	});

	it("matches comparing depths on random trees", () => {
		const random = createRandom(1466);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 12);
			const connections = Array.from({ length: n - 1 }, (_, i) => {
				const [parent, child] = [random.int(0, i), i + 1];
				return random.next() < 0.5 ? [parent, child] : [child, parent];
			});
			expect(minReorder(n, connections)).toBe(byBruteForce(n, connections));
		}
	});
});
