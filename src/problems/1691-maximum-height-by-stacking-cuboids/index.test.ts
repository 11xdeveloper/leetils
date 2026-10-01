import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumHeightByStackingCuboids as maxHeight } from ".";

/** Tries every unused cuboid in every rotation on top of the stack. */
const byBruteForce = (cuboids: number[][]): number => {
	const rotations = (c: number[]): number[][] => {
		const [a = 0, b = 0, d = 0] = c;
		return [
			[a, b, d],
			[a, d, b],
			[b, a, d],
			[b, d, a],
			[d, a, b],
			[d, b, a],
		];
	};
	const stack = (used: number, top: number[]): number => {
		let best = 0;
		for (const [i, cuboid] of cuboids.entries()) {
			if (used & (1 << i)) continue;
			for (const rotated of rotations(cuboid)) {
				if (rotated.every((size, k) => size <= (top[k] ?? 0)))
					best = Math.max(
						best,
						(rotated[2] ?? 0) + stack(used | (1 << i), rotated),
					);
			}
		}
		return best;
	};
	return stack(0, [Infinity, Infinity, Infinity]);
};

describe("1691. Maximum Height by Stacking Cuboids", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxHeight([
				[50, 45, 20],
				[95, 37, 53],
				[45, 23, 12],
			]),
		).toBe(190);
		expect(
			maxHeight([
				[38, 25, 45],
				[76, 35, 3],
			]),
		).toBe(76);
		expect(
			maxHeight([
				[7, 11, 17],
				[7, 17, 11],
				[11, 7, 17],
				[11, 17, 7],
				[17, 7, 11],
				[17, 11, 7],
			]),
		).toBe(102);
	});

	it("matches trying every stack on random inputs", () => {
		const random = createRandom(1691);
		for (let run = 0; run < 100; run++) {
			const cuboids = Array.from({ length: random.int(1, 4) }, () =>
				random.array(3, 1, 5),
			);
			expect(maxHeight(cuboids)).toBe(byBruteForce(cuboids));
		}
	});
});
