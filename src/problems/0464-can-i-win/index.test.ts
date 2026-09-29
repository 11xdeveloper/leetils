import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { canIWin } from ".";

/** Plain game tree search, without memoisation. */
const byBruteForce = (max: number, total: number): boolean => {
	if (total <= 0) return true;
	if ((max * (max + 1)) / 2 < total) return false;
	const wins = (unused: number[], remaining: number): boolean =>
		unused.some(
			(pick) =>
				pick >= remaining ||
				!wins(
					unused.filter((n) => n !== pick),
					remaining - pick,
				),
		);
	return wins(
		Array.from({ length: max }, (_, i) => i + 1),
		total,
	);
};

describe("464. Can I Win", () => {
	it("solves the examples from the problem statement", () => {
		expect(canIWin(10, 11)).toBeFalse();
		expect(canIWin(10, 0)).toBeTrue();
		expect(canIWin(10, 1)).toBeTrue();
	});

	it("handles the largest inputs", () => {
		expect(canIWin(20, 210)).toBeFalse();
		expect(canIWin(20, 300)).toBeFalse();
		expect(canIWin(18, 79)).toBeTrue();
	});

	it("matches searching the game tree for small games", () => {
		const random = createRandom(464);
		for (let run = 0; run < 150; run++) {
			const max = random.int(1, 7);
			const total = random.int(0, 30);
			expect(canIWin(max, total)).toBe(byBruteForce(max, total));
		}
	});
});
