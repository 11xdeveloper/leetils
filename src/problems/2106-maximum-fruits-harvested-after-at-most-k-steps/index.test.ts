import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumFruitsHarvestedAfterAtMostKSteps as maxTotalFruits } from ".";

/** Tries every range of positions within reach. */
const byBruteForce = (fruits: number[][], start: number, k: number): number => {
	let best = 0;
	for (let left = start - k; left <= start; left++) {
		for (let right = start; right <= start + k; right++) {
			if (right - left + Math.min(start - left, right - start) > k) continue;
			let sum = 0;
			for (const [p = 0, a = 0] of fruits)
				if (p >= left && p <= right) sum += a;
			best = Math.max(best, sum);
		}
	}
	return best;
};

describe("2106. Maximum Fruits Harvested After at Most K Steps", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxTotalFruits(
				[
					[2, 8],
					[6, 3],
					[8, 6],
				],
				5,
				4,
			),
		).toBe(9);
		expect(
			maxTotalFruits(
				[
					[0, 9],
					[4, 1],
					[5, 7],
					[6, 2],
					[7, 4],
					[10, 9],
				],
				5,
				4,
			),
		).toBe(14);
		expect(
			maxTotalFruits(
				[
					[0, 3],
					[6, 4],
					[8, 5],
				],
				3,
				2,
			),
		).toBe(0);
	});

	it("matches trying every range on random inputs", () => {
		const random = createRandom(2106);
		for (let run = 0; run < 300; run++) {
			const positions = [
				...new Set(random.array(random.int(1, 8), 0, 15)),
			].sort((a, b) => a - b);
			const fruits = positions.map((p) => [p, random.int(1, 9)]);
			const start = random.int(0, 15);
			const k = random.int(0, 10);
			expect(maxTotalFruits(fruits, start, k)).toBe(
				byBruteForce(fruits, start, k),
			);
		}
	});
});
