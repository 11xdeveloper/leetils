import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPointsInsideTheSquare as maxPointsInsideSquare } from ".";

/** Tries every square size. */
const byBruteForce = (points: number[][], s: string): number => {
	let best = 0;
	for (let d = 0; d <= 10; d++) {
		const inside = points
			.map((p, i) => [p, i] as const)
			.filter(([[x = 0, y = 0]]) => Math.max(Math.abs(x), Math.abs(y)) <= d);
		const tags = inside.map(([, i]) => s[i]);
		if (new Set(tags).size === tags.length)
			best = Math.max(best, inside.length);
	}
	return best;
};

describe("3143. Maximum Points Inside the Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPointsInsideSquare(
				[
					[2, 2],
					[-1, -2],
					[-4, 4],
					[-3, 1],
					[3, -3],
				],
				"abdca",
			),
		).toBe(2);
		expect(
			maxPointsInsideSquare(
				[
					[1, 1],
					[-2, -2],
					[-2, 2],
				],
				"abb",
			),
		).toBe(1);
		expect(
			maxPointsInsideSquare(
				[
					[1, 1],
					[-1, -1],
					[2, -2],
				],
				"ccd",
			),
		).toBe(0);
	});

	it("matches trying every size on random points", () => {
		const random = createRandom(3143);
		for (let run = 0; run < 300; run++) {
			const points = Array.from({ length: random.int(1, 8) }, () => [
				random.int(-6, 6),
				random.int(-6, 6),
			]);
			const s = random.string(points.length, "abc");
			expect(maxPointsInsideSquare(points, s)).toBe(byBruteForce(points, s));
		}
	});
});
