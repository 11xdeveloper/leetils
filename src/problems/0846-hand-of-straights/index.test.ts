import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { handOfStraights as isNStraightHand } from ".";

/** Tries every way of building groups from the smallest remaining card. */
const byBacktracking = (hand: number[], size: number): boolean => {
	if (hand.length === 0) return true;
	const sorted = hand.toSorted((a, b) => a - b);
	const rest = [...sorted];
	for (let card = sorted[0] ?? 0; card < (sorted[0] ?? 0) + size; card++) {
		const at = rest.indexOf(card);
		if (at === -1) return false;
		rest.splice(at, 1);
	}
	return byBacktracking(rest, size);
};

describe("846. Hand of Straights", () => {
	it("solves the examples from the problem statement", () => {
		expect(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)).toBeTrue();
		expect(isNStraightHand([1, 2, 3, 4, 5], 4)).toBeFalse();
	});

	it("matches removing groups one at a time on random hands", () => {
		const random = createRandom(846);
		for (let run = 0; run < 1000; run++) {
			const hand = random.array(random.int(1, 12), 0, 6);
			const size = random.int(1, 4);
			expect(isNStraightHand(hand, size)).toBe(
				hand.length % size === 0 && byBacktracking(hand, size),
			);
		}
	});
});
