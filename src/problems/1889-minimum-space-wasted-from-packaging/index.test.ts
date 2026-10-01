import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSpaceWastedFromPackaging as minWastedSpace } from ".";

describe("1889. Minimum Space Wasted From Packaging", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minWastedSpace(
				[2, 3, 5],
				[
					[4, 8],
					[2, 8],
				],
			),
		).toBe(6);
		expect(
			minWastedSpace(
				[2, 3, 5],
				[
					[1, 4],
					[2, 3],
					[3, 4],
				],
			),
		).toBe(-1);
		expect(
			minWastedSpace([3, 5, 8, 10, 11, 12], [[12], [11, 9], [10, 5, 14]]),
		).toBe(9);
	});

	it("matches packing each package into its smallest fitting box on random inputs", () => {
		const random = createRandom(1889);
		for (let run = 0; run < 200; run++) {
			const packages = random.array(random.int(1, 8), 1, 20);
			const boxes = Array.from({ length: random.int(1, 4) }, () => [
				...new Set(random.array(random.int(1, 4), 1, 22)),
			]);
			let best = Infinity;
			for (const supplier of boxes) {
				let waste = 0;
				for (const size of packages) {
					const fitting = supplier.filter((box) => box >= size);
					waste += fitting.length ? Math.min(...fitting) - size : Infinity;
				}
				best = Math.min(best, waste);
			}
			expect(minWastedSpace(packages, boxes)).toBe(
				best === Infinity ? -1 : best,
			);
		}
	});
});
