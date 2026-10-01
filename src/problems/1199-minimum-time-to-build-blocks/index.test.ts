import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToBuildBlocks as minBuildTime } from ".";

/** A worker builds its only block, or splits, handing each half some of the blocks. */
const byBruteForce = (blocks: number[], split: number): number => {
	if (blocks.length === 1) return blocks[0] ?? 0;
	let best = Infinity;
	// The first block always goes to the first half, so each division is tried once.
	for (let mask = 0; mask < 2 ** (blocks.length - 1); mask++) {
		const first = [blocks[0] ?? 0];
		const second: number[] = [];
		blocks.slice(1).forEach((block, i) => {
			(mask & (1 << i) ? first : second).push(block);
		});
		if (second.length === 0) continue;
		best = Math.min(
			best,
			split + Math.max(byBruteForce(first, split), byBruteForce(second, split)),
		);
	}
	return best;
};

describe("1199. Minimum Time to Build Blocks", () => {
	it("solves the examples from the problem statement", () => {
		expect(minBuildTime([1], 1)).toBe(1);
		expect(minBuildTime([1, 2], 5)).toBe(7);
		expect(minBuildTime([1, 2, 3], 1)).toBe(4);
	});

	it("matches trying every way of dividing the blocks on random inputs", () => {
		const random = createRandom(1199);
		for (let run = 0; run < 200; run++) {
			const blocks = random.array(random.int(1, 6), 1, 20);
			const split = random.int(1, 10);
			expect(minBuildTime(blocks, split)).toBe(byBruteForce(blocks, split));
		}
	});
});
