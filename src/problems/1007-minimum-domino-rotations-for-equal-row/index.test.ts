import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDominoRotationsForEqualRow as minDominoRotations } from ".";

describe("1007. Minimum Domino Rotations For Equal Row", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDominoRotations([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2])).toBe(2);
		expect(minDominoRotations([3, 5, 1, 2, 3], [3, 6, 3, 3, 4])).toBe(-1);
	});

	it("matches trying every set of rotations on random dominoes", () => {
		const random = createRandom(1007);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const tops = random.array(n, 1, 3);
			const bottoms = random.array(n, 1, 3);
			let best = Number.POSITIVE_INFINITY;
			for (let mask = 0; mask < 1 << n; mask++) {
				const t = tops.map((v, i) => (mask & (1 << i) ? (bottoms[i] ?? 0) : v));
				const b = bottoms.map((v, i) => (mask & (1 << i) ? (tops[i] ?? 0) : v));
				if (new Set(t).size === 1 || new Set(b).size === 1) {
					let rotations = 0;
					for (let bits = mask; bits; bits &= bits - 1) rotations++;
					best = Math.min(best, rotations);
				}
			}
			expect(minDominoRotations(tops, bottoms)).toBe(
				best === Number.POSITIVE_INFINITY ? -1 : best,
			);
		}
	});
});
