import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumWhiteTilesCoveredByACarpet as maximumWhiteTiles } from ".";

/** Tries every carpet position over the tiles. */
const byBruteForce = (tiles: number[][], carpetLen: number): number => {
	const white = new Set(
		tiles.flatMap(([l = 0, r = 0]) =>
			Array.from({ length: r - l + 1 }, (_, i) => l + i),
		),
	);
	let best = 0;
	for (const start of white) {
		let count = 0;
		for (let x = start; x < start + carpetLen; x++) if (white.has(x)) count++;
		best = Math.max(best, count);
	}
	return best;
};

describe("2271. Maximum White Tiles Covered by a Carpet", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumWhiteTiles(
				[
					[1, 5],
					[10, 11],
					[12, 18],
					[20, 25],
					[30, 32],
				],
				10,
			),
		).toBe(9);
		expect(
			maximumWhiteTiles(
				[
					[10, 11],
					[1, 1],
				],
				2,
			),
		).toBe(2);
	});

	it("matches trying every position on random tiles", () => {
		const random = createRandom(2271);
		for (let run = 0; run < 300; run++) {
			const tiles: number[][] = [];
			let x = random.int(1, 3);
			for (let i = random.int(1, 5); i > 0; i--) {
				const length = random.int(1, 4);
				tiles.push([x, x + length - 1]);
				x += length + random.int(1, 3);
			}
			const carpetLen = random.int(1, 12);
			const shuffled = tiles.sort(() => random.next() - 0.5);
			expect(maximumWhiteTiles(shuffled, carpetLen)).toBe(
				byBruteForce(shuffled, carpetLen),
			);
		}
	});
});
