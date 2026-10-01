import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAveragePassRatio as maxAverageRatio } from ".";

/** Tries every way to split the extra students among the classes. */
const byBruteForce = (classes: number[][], extra: number): number => {
	let best = 0;
	const assign = (i: number, left: number, sum: number) => {
		const [pass = 0, total = 1] = classes[i] ?? [];
		if (i === classes.length - 1) {
			best = Math.max(
				best,
				(sum + (pass + left) / (total + left)) / classes.length,
			);
			return;
		}
		for (let given = 0; given <= left; given++)
			assign(i + 1, left - given, sum + (pass + given) / (total + given));
	};
	assign(0, extra, 0);
	return best;
};

describe("1792. Maximum Average Pass Ratio", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxAverageRatio(
				[
					[1, 2],
					[3, 5],
					[2, 2],
				],
				2,
			),
		).toBeCloseTo(0.78333, 5);
		expect(
			maxAverageRatio(
				[
					[2, 4],
					[3, 9],
					[4, 5],
					[2, 10],
				],
				4,
			),
		).toBeCloseTo(0.53485, 5);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1792);
		for (let run = 0; run < 200; run++) {
			const classes = Array.from({ length: random.int(1, 4) }, () => {
				const total = random.int(1, 6);
				return [random.int(1, total), total];
			});
			const extra = random.int(1, 5);
			expect(maxAverageRatio(classes, extra)).toBeCloseTo(
				byBruteForce(classes, extra),
				9,
			);
		}
	});
});
