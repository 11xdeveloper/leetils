import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lonelyPixelII as findBlackPixel } from ".";

/** Checks the rules for every black pixel. */
const byBruteForce = (picture: string[][], target: number): number => {
	let lonely = 0;
	for (const [r, row] of picture.entries()) {
		for (const [c, pixel] of row.entries()) {
			if (pixel !== "B") continue;
			const inRow = row.filter((p) => p === "B").length;
			const blackRows = picture.filter((other) => other[c] === "B");
			if (
				inRow === target &&
				blackRows.length === target &&
				blackRows.every((other) => other.join() === row.join())
			)
				lonely++;
		}
	}
	return lonely;
};

describe("533. Lonely Pixel II", () => {
	it("solves the examples from the problem statement", () => {
		const picture = [
			["W", "B", "W", "B", "B", "W"],
			["W", "B", "W", "B", "B", "W"],
			["W", "B", "W", "B", "B", "W"],
			["W", "W", "B", "W", "B", "W"],
		];
		expect(findBlackPixel(picture, 3)).toBe(6);
		expect(
			findBlackPixel(
				[
					["W", "W", "B"],
					["W", "W", "B"],
					["W", "W", "B"],
				],
				1,
			),
		).toBe(0);
	});

	it("matches checking every pixel on random pictures", () => {
		const random = createRandom(533);
		for (let run = 0; run < 1000; run++) {
			const cols = random.int(1, 4);
			// Draw rows from a small pool so identical rows are common.
			const pool = Array.from({ length: 3 }, () => [
				...random.string(cols, "WB"),
			]);
			const picture = Array.from({ length: random.int(1, 5) }, () => [
				...(pool[random.int(0, 2)] ?? []),
			]);
			const target = random.int(1, Math.min(picture.length, cols));
			expect(findBlackPixel(picture, target)).toBe(
				byBruteForce(picture, target),
			);
		}
	});
});
