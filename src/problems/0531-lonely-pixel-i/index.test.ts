import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lonelyPixelI as findLonelyPixel } from ".";

const byBruteForce = (picture: string[][]): number => {
	let lonely = 0;
	for (const [r, row] of picture.entries()) {
		for (const [c, pixel] of row.entries()) {
			if (pixel !== "B") continue;
			const inRow = row.filter((p) => p === "B").length;
			const inCol = picture.filter((other) => other[c] === "B").length;
			if (inRow === 1 && inCol === 1) lonely++;
		}
	}
	return lonely;
};

describe("531. Lonely Pixel I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findLonelyPixel([
				["W", "W", "B"],
				["W", "B", "W"],
				["B", "W", "W"],
			]),
		).toBe(3);
		expect(
			findLonelyPixel([
				["B", "B", "B"],
				["B", "B", "W"],
				["B", "B", "B"],
			]),
		).toBe(0);
	});

	it("matches counting row by row on random pictures", () => {
		const random = createRandom(531);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 6);
			const picture = Array.from({ length: random.int(1, 6) }, () => [
				...random.string(cols, "WWWB"),
			]);
			expect(findLonelyPixel(picture)).toBe(byBruteForce(picture));
		}
	});
});
