import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fallingSquares } from ".";

/** Tracks the height of every unit column. */
const byColumns = (positions: number[][]): number[] => {
	const heights = new Map<number, number>();
	let highest = 0;
	return positions.map(([left = 0, side = 0]) => {
		let base = 0;
		for (let x = left; x < left + side; x++)
			base = Math.max(base, heights.get(x) ?? 0);
		for (let x = left; x < left + side; x++) heights.set(x, base + side);
		highest = Math.max(highest, base + side);
		return highest;
	});
};

describe("699. Falling Squares", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			fallingSquares([
				[1, 2],
				[2, 3],
				[6, 1],
			]),
		).toEqual([2, 5, 5]);
		expect(
			fallingSquares([
				[100, 100],
				[200, 100],
			]),
		).toEqual([100, 100]);
	});

	it("matches tracking every column on random inputs", () => {
		const random = createRandom(699);
		for (let run = 0; run < 1000; run++) {
			const positions = Array.from({ length: random.int(1, 10) }, () => [
				random.int(1, 10),
				random.int(1, 4),
			]);
			expect(fallingSquares(positions)).toEqual(byColumns(positions));
		}
	});
});
