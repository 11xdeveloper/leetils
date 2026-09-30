import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { floodFill } from ".";

const byRecursion = (
	image: number[][],
	sr: number,
	sc: number,
	color: number,
): number[][] => {
	const result = image.map((row) => [...row]);
	const original = result[sr]?.[sc];
	const fill = (r: number, c: number): void => {
		const row = result[r];
		if (!row || row[c] !== original || original === color) return;
		row[c] = color;
		fill(r - 1, c);
		fill(r + 1, c);
		fill(r, c - 1);
		fill(r, c + 1);
	};
	fill(sr, sc);
	return result;
};

describe("733. Flood Fill", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			floodFill(
				[
					[1, 1, 1],
					[1, 1, 0],
					[1, 0, 1],
				],
				1,
				1,
				2,
			),
		).toEqual([
			[2, 2, 2],
			[2, 2, 0],
			[2, 0, 1],
		]);
		expect(
			floodFill(
				[
					[0, 0, 0],
					[0, 0, 0],
				],
				0,
				0,
				0,
			),
		).toEqual([
			[0, 0, 0],
			[0, 0, 0],
		]);
	});

	it("matches a recursive fill on random images and leaves the input unchanged", () => {
		const random = createRandom(733);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const image = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 2),
			);
			const before = JSON.stringify(image);
			const sr = random.int(0, image.length - 1);
			const sc = random.int(0, cols - 1);
			const color = random.int(0, 2);
			expect(floodFill(image, sr, sc, color)).toEqual(
				byRecursion(image, sr, sc, color),
			);
			expect(JSON.stringify(image)).toBe(before);
		}
	});
});
