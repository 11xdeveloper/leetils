import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pourWater } from ".";

/** Moves each unit one step at a time following the rules literally. */
const bySimulation = (
	heights: number[],
	volume: number,
	k: number,
): number[] => {
	const levels = [...heights];
	const at = (i: number) => levels[i] ?? Number.POSITIVE_INFINITY;
	/** The spot the unit settles at moving in `step` direction, if it eventually falls. */
	const settle = (step: number): number | undefined => {
		let best = k;
		for (
			let i = k + step;
			i >= 0 && i < levels.length && at(i) <= at(i - step);
			i += step
		)
			if (at(i) < at(best)) best = i;
		return best === k ? undefined : best;
	};
	for (let drop = 0; drop < volume; drop++) {
		const spot = settle(-1) ?? settle(1) ?? k;
		levels[spot] = at(spot) + 1;
	}
	return levels;
};

describe("755. Pour Water", () => {
	it("solves the examples from the problem statement", () => {
		expect(pourWater([2, 1, 1, 2, 1, 2, 2], 4, 3)).toEqual([
			2, 2, 2, 3, 2, 2, 2,
		]);
		expect(pourWater([1, 2, 3, 4], 2, 2)).toEqual([2, 3, 3, 4]);
		expect(pourWater([3, 1, 3], 5, 1)).toEqual([4, 4, 4]);
	});

	it("matches following the rules unit by unit on random terrain", () => {
		const random = createRandom(755);
		for (let run = 0; run < 1000; run++) {
			const heights = random.array(random.int(1, 8), 0, 4);
			const volume = random.int(0, 10);
			const k = random.int(0, heights.length - 1);
			expect(pourWater(heights, volume, k)).toEqual(
				bySimulation(heights, volume, k),
			);
		}
	});
});
