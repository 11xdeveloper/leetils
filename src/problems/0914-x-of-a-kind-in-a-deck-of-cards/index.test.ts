import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { xOfAKindInADeckOfCards as hasGroupsSizeX } from ".";

describe("914. X of a Kind in a Deck of Cards", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1])).toBeTrue();
		expect(hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3])).toBeFalse();
	});

	it("matches trying every group size on random decks", () => {
		const random = createRandom(914);
		for (let run = 0; run < 1000; run++) {
			const deck = random.array(random.int(1, 12), 0, 3);
			const counts = [...new Set(deck)].map(
				(card) => deck.filter((c) => c === card).length,
			);
			const expected = Array.from(
				{ length: deck.length - 1 },
				(_, i) => i + 2,
			).some((x) => counts.every((count) => count % x === 0));
			expect(hasGroupsSizeX(deck)).toBe(expected);
		}
	});
});
