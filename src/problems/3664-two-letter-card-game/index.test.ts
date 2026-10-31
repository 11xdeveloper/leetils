import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { twoLetterCardGame as score } from ".";

/** Tries every matching. */
const byBruteForce = (cards: string[], x: string): number => {
	const compatible = (a: string, b: string) =>
		a.includes(x) &&
		b.includes(x) &&
		(a[0] === b[0] ? 1 : 0) + (a[1] === b[1] ? 1 : 0) === 1;
	const go = (rest: string[]): number => {
		if (rest.length < 2) return 0;
		const [head = "", ...tail] = rest;
		let best = go(tail);
		tail.forEach((card, i) => {
			if (compatible(head, card))
				best = Math.max(best, 1 + go(tail.filter((_, j) => j !== i)));
		});
		return best;
	};
	return go(cards);
};

describe("3664. Two-Letter Card Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(score(["aa", "ab", "ba", "ac"], "a")).toBe(2);
		expect(score(["aa", "ab", "ba"], "a")).toBe(1);
		expect(score(["aa", "ab", "ba", "ac"], "b")).toBe(0);
	});

	it("matches trying every matching on random cards", () => {
		const random = createRandom(3664);
		for (let run = 0; run < 200; run++) {
			const cards = Array.from({ length: random.int(1, 9) }, () =>
				random.string(2, "abc"),
			);
			expect(score(cards, "a")).toBe(byBruteForce(cards, "a"));
		}
	});
});
