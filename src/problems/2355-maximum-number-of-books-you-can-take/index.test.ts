import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfBooksYouCanTake as maximumBooks } from ".";

/** Tries every right end, taking as much as possible leftwards. */
const byBruteForce = (books: number[]): number => {
	let best = 0;
	for (let r = 0; r < books.length; r++) {
		let [total, take] = [0, Infinity];
		for (let i = r; i >= 0; i--) {
			take = Math.min(take - 1, books[i] ?? 0);
			if (i === r) take = books[i] ?? 0;
			if (take <= 0) break;
			total += take;
		}
		best = Math.max(best, total);
	}
	return best;
};

describe("2355. Maximum Number of Books You Can Take", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumBooks([8, 5, 2, 7, 9])).toBe(19);
		expect(maximumBooks([7, 0, 3, 4, 5])).toBe(12);
		expect(maximumBooks([8, 2, 3, 7, 3, 4, 0, 1, 4, 3])).toBe(13);
	});

	it("matches a greedy scan from every right end on random shelves", () => {
		const random = createRandom(2355);
		for (let run = 0; run < 300; run++) {
			const books = random.array(random.int(1, 10), 0, 8);
			expect(maximumBooks(books)).toBe(byBruteForce(books));
		}
	});
});
