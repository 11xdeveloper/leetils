import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { gridIllumination } from ".";

/** Checks every lamp for every query. */
const byBruteForce = (lamps: number[][], queries: number[][]): number[] => {
	const on = new Map(lamps.map((lamp) => [lamp.join(), lamp]));
	return queries.map(([r = 0, c = 0]) => {
		const lit = [...on.values()].some(
			([lr = 0, lc = 0]) =>
				lr === r || lc === c || lr - lc === r - c || lr + lc === r + c,
		)
			? 1
			: 0;
		for (const [key, [lr = 0, lc = 0]] of [...on])
			if (Math.abs(lr - r) <= 1 && Math.abs(lc - c) <= 1) on.delete(key);
		return lit;
	});
};

describe("1001. Grid Illumination", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			gridIllumination(
				5,
				[
					[0, 0],
					[4, 4],
				],
				[
					[1, 1],
					[1, 0],
				],
			),
		).toEqual([1, 0]);
		expect(
			gridIllumination(
				5,
				[
					[0, 0],
					[4, 4],
				],
				[
					[1, 1],
					[1, 1],
				],
			),
		).toEqual([1, 1]);
		expect(
			gridIllumination(
				5,
				[
					[0, 0],
					[0, 4],
				],
				[
					[0, 4],
					[0, 1],
					[1, 4],
				],
			),
		).toEqual([1, 1, 0]);
	});

	it("matches checking every lamp on random grids, including repeated lamps", () => {
		const random = createRandom(1001);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const lamps = Array.from({ length: random.int(0, 8) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			const queries = Array.from({ length: random.int(1, 6) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(gridIllumination(n, lamps, queries)).toEqual(
				byBruteForce(lamps, queries),
			);
		}
	});
});
