import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { networkRecoveryPathways as findMaxPathScore } from ".";

/** Walks every path. */
const byBruteForce = (
	edges: number[][],
	online: boolean[],
	k: number,
): number => {
	const n = online.length;
	let best = -1;
	const walk = (v: number, cost: number, least: number): void => {
		if (cost > k) return;
		if (v === n - 1) best = Math.max(best, least);
		for (const [u = 0, to = 0, c = 0] of edges)
			if (u === v && online[to]) walk(to, cost + c, Math.min(least, c));
	};
	walk(0, 0, Number.POSITIVE_INFINITY);
	return best;
};

describe("3620. Network Recovery Pathways", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMaxPathScore(
				[
					[0, 1, 5],
					[1, 3, 10],
					[0, 2, 3],
					[2, 3, 4],
				],
				[true, true, true, true],
				10,
			),
		).toBe(3);
		expect(
			findMaxPathScore(
				[
					[0, 1, 7],
					[1, 4, 5],
					[0, 2, 6],
					[2, 3, 6],
					[3, 4, 2],
					[2, 4, 6],
				],
				[true, true, true, false, true],
				12,
			),
		).toBe(6);
	});

	it("matches walking every path on random graphs", () => {
		const random = createRandom(3620);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 6);
			const edges: number[][] = [];
			for (let u = 0; u < n; u++)
				for (let v = u + 1; v < n; v++)
					if (random.int(0, 1)) edges.push([u, v, random.int(0, 9)]);
			const online = Array.from(
				{ length: n },
				(_, i) => i === 0 || i === n - 1 || random.int(0, 3) > 0,
			);
			const k = random.int(0, 25);
			expect(findMaxPathScore(edges, online, k)).toBe(
				byBruteForce(edges, online, k),
			);
		}
	});
});
