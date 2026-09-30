import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { twoCityScheduling } from ".";

describe("1029. Two City Scheduling", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			twoCityScheduling([
				[10, 20],
				[30, 200],
				[400, 50],
				[30, 20],
			]),
		).toBe(110);
		expect(
			twoCityScheduling([
				[259, 770],
				[448, 54],
				[926, 667],
				[184, 139],
				[840, 118],
				[577, 469],
			]),
		).toBe(1859);
	});

	it("matches trying every split on random costs", () => {
		const random = createRandom(1029);
		for (let run = 0; run < 300; run++) {
			const costs = Array.from({ length: 2 * random.int(1, 5) }, () => [
				random.int(1, 50),
				random.int(1, 50),
			]);
			let best = Number.POSITIVE_INFINITY;
			for (let mask = 0; mask < 1 << costs.length; mask++) {
				let toA = 0;
				for (let bits = mask; bits; bits &= bits - 1) toA++;
				if (toA !== costs.length / 2) continue;
				best = Math.min(
					best,
					costs.reduce(
						(total, [a = 0, b = 0], i) => total + (mask & (1 << i) ? a : b),
						0,
					),
				);
			}
			expect(twoCityScheduling(costs)).toBe(best);
		}
	});
});
