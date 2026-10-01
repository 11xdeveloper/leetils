import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { revealCardsInIncreasingOrder as deckRevealedIncreasing } from ".";

const reveal = (deck: number[]): number[] => {
	const queue = [...deck];
	const revealed: number[] = [];
	while (queue.length > 0) {
		revealed.push(queue.shift() ?? 0);
		if (queue.length > 0) queue.push(queue.shift() ?? 0);
	}
	return revealed;
};

describe("950. Reveal Cards In Increasing Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7])).toEqual([
			2, 13, 3, 11, 5, 17, 7,
		]);
		expect(deckRevealedIncreasing([1, 1000])).toEqual([1, 1000]);
	});

	it("reveals random decks in increasing order", () => {
		const random = createRandom(950);
		for (let run = 0; run < 500; run++) {
			const deck = [...new Set(random.array(random.int(1, 20), 1, 100))];
			expect(reveal(deckRevealedIncreasing(deck))).toEqual(
				deck.toSorted((a, b) => a - b),
			);
		}
	});
});
