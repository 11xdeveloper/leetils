import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeForKVirusVariantsToSpread as minDayskVariants } from ".";

/** Simulates the spread day by day on a padded grid. */
const bySimulation = (points: number[][], k: number): number => {
	for (let day = 0; ; day++) {
		for (let x = -day; x <= 20 + day; x++) {
			for (let y = -day; y <= 20 + day; y++) {
				const reached = points.filter(
					([px = 0, py = 0]) => Math.abs(px - x) + Math.abs(py - y) <= day,
				).length;
				if (reached >= k) return day;
			}
		}
	}
};

describe("1956. Minimum Time For K Virus Variants to Spread", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minDayskVariants(
				[
					[1, 1],
					[6, 1],
				],
				2,
			),
		).toBe(3);
		expect(
			minDayskVariants(
				[
					[3, 3],
					[1, 2],
					[9, 2],
				],
				2,
			),
		).toBe(2);
		expect(
			minDayskVariants(
				[
					[3, 3],
					[1, 2],
					[9, 2],
				],
				3,
			),
		).toBe(4);
	});

	it("matches simulating the spread on random inputs", () => {
		const random = createRandom(1956);
		for (let run = 0; run < 50; run++) {
			const points = Array.from({ length: random.int(2, 5) }, () => [
				random.int(1, 20),
				random.int(1, 20),
			]);
			const k = random.int(2, points.length);
			expect(minDayskVariants(points, k)).toBe(bySimulation(points, k));
		}
	});
});
