import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheFirstPlayerToWinKGamesInARow as findWinningPlayer } from ".";

/** Plays the games out. */
const byBruteForce = (skills: number[], k: number): number => {
	const queue = skills.map((_, i) => i);
	let wins = 0;
	for (;;) {
		const [a = 0, b = 0] = queue;
		const [winner, loser] =
			(skills[a] ?? 0) > (skills[b] ?? 0) ? [a, b] : [b, a];
		wins = winner === a ? wins + 1 : 1;
		queue.splice(0, 2, winner);
		queue.push(loser);
		if (wins === k) return winner;
	}
};

describe("3175. Find The First Player to win K Games in a Row", () => {
	it("solves the examples from the problem statement", () => {
		expect(findWinningPlayer([4, 2, 6, 3, 9], 2)).toBe(2);
		expect(findWinningPlayer([2, 5, 4], 3)).toBe(1);
	});

	it("matches playing the games out", () => {
		const random = createRandom(3175);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 8);
			const skills = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const k = random.int(1, 12);
			expect(findWinningPlayer(skills, k)).toBe(byBruteForce(skills, k));
		}
	});
});
