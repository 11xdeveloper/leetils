import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fillingBookcaseShelves as minHeightShelves } from ".";

/** Tries every way of splitting the books into consecutive shelves. */
const byBruteForce = (books: number[][], shelfWidth: number): number => {
	let best = Infinity;
	for (let breaks = 0; breaks < 2 ** (books.length - 1); breaks++) {
		let [total, width, height] = [0, 0, 0];
		let fits = true;
		books.forEach(([thickness = 0, bookHeight = 0], i) => {
			if (i > 0 && breaks & (1 << (i - 1))) {
				total += height;
				[width, height] = [0, 0];
			}
			width += thickness;
			height = Math.max(height, bookHeight);
			if (width > shelfWidth) fits = false;
		});
		if (fits) best = Math.min(best, total + height);
	}
	return best;
};

describe("1105. Filling Bookcase Shelves", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minHeightShelves(
				[
					[1, 1],
					[2, 3],
					[2, 3],
					[1, 1],
					[1, 1],
					[1, 1],
					[1, 2],
				],
				4,
			),
		).toBe(6);
		expect(
			minHeightShelves(
				[
					[1, 3],
					[2, 4],
					[3, 2],
				],
				6,
			),
		).toBe(4);
	});

	it("puts each book on its own shelf when every book fills the width", () => {
		const books = Array.from({ length: 1000 }, (_, i) => [1000, (i % 7) + 1]);
		expect(minHeightShelves(books, 1000)).toBe(
			books.reduce((sum, [, height = 0]) => sum + height, 0),
		);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1105);
		for (let run = 0; run < 300; run++) {
			const shelfWidth = random.int(1, 8);
			const books = Array.from({ length: random.int(1, 9) }, () => [
				random.int(1, shelfWidth),
				random.int(1, 9),
			]);
			expect(minHeightShelves(books, shelfWidth)).toBe(
				byBruteForce(books, shelfWidth),
			);
		}
	});
});
