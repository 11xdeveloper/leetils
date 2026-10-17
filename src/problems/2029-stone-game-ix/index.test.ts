import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameIX } from ".";

/** Plays out the game on the counts of stones by value mod 3. */
const byBruteForce = (stones: number[]): boolean => {
	const memo = new Map<string, boolean>();
	const aliceWins = (
		counts: number[],
		sum: number,
		alice: boolean,
	): boolean => {
		// Bob wins when the stones run out.
		if (counts.every((count) => count === 0)) return false;
		const key = `${counts}/${sum}/${alice}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		// A move that makes the total divisible by 3 loses for the mover.
		const outcomes = [0, 1, 2]
			.filter((kind) => counts[kind])
			.map((kind) =>
				(sum + kind) % 3 === 0
					? !alice
					: aliceWins(
							counts.with(kind, (counts[kind] ?? 0) - 1),
							(sum + kind) % 3,
							!alice,
						),
			);
		const result = alice ? outcomes.some(Boolean) : outcomes.every(Boolean);
		memo.set(key, result);
		return result;
	};
	const counts = [0, 0, 0];
	for (const stone of stones) counts[stone % 3] = (counts[stone % 3] ?? 0) + 1;
	return aliceWins(counts, 0, true);
};

describe("2029. Stone Game IX", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameIX([2, 1])).toBeTrue();
		expect(stoneGameIX([2])).toBeFalse();
		expect(stoneGameIX([5, 1, 2, 4, 3])).toBeFalse();
	});

	it("matches playing out every game on random piles", () => {
		const random = createRandom(2029);
		for (let run = 0; run < 300; run++) {
			const stones = random.array(random.int(1, 10), 1, 9);
			expect(stoneGameIX(stones)).toBe(byBruteForce(stones));
		}
	});
});
