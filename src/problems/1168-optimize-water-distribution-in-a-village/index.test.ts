import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { optimizeWaterDistributionInAVillage as minCostToSupplyWater } from ".";

/** Tries every set of wells with every set of pipes. */
const byBruteForce = (
	n: number,
	wells: number[],
	pipes: number[][],
): number => {
	let best = Infinity;
	for (let wellSet = 1; wellSet < 2 ** n; wellSet++) {
		for (let pipeSet = 0; pipeSet < 2 ** pipes.length; pipeSet++) {
			const chosen = pipes.filter((_, i) => pipeSet & (1 << i));
			const watered = new Set<number>();
			for (let house = 1; house <= n; house++) {
				if (wellSet & (1 << (house - 1))) watered.add(house);
			}
			for (let grew = true; grew; ) {
				grew = false;
				for (const [a = 0, b = 0] of chosen) {
					if (watered.has(a) === watered.has(b)) continue;
					watered.add(a);
					watered.add(b);
					grew = true;
				}
			}
			if (watered.size < n) continue;
			const cost =
				wells.reduce(
					(sum, well, i) => sum + (wellSet & (1 << i) ? well : 0),
					0,
				) + chosen.reduce((sum, [, , pipe = 0]) => sum + pipe, 0);
			best = Math.min(best, cost);
		}
	}
	return best;
};

describe("1168. Optimize Water Distribution in a Village", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCostToSupplyWater(
				3,
				[1, 2, 2],
				[
					[1, 2, 1],
					[2, 3, 1],
				],
			),
		).toBe(3);
		expect(
			minCostToSupplyWater(
				2,
				[1, 1],
				[
					[1, 2, 1],
					[1, 2, 2],
				],
			),
		).toBe(2);
	});

	it("doesn't change the pipes", () => {
		const pipes = [[1, 2, 1]];
		minCostToSupplyWater(2, [5, 5], pipes);
		expect(pipes).toEqual([[1, 2, 1]]);
	});

	it("matches trying every set of wells and pipes on random inputs", () => {
		const random = createRandom(1168);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 4);
			const wells = random.array(n, 0, 10);
			const pipes = Array.from({ length: random.int(1, 5) }, () => {
				const a = random.int(1, n);
				return [a, ((a + random.int(0, n - 2)) % n) + 1, random.int(0, 10)];
			});
			expect(minCostToSupplyWater(n, wells, pipes)).toBe(
				byBruteForce(n, wells, pipes),
			);
		}
	});
});
