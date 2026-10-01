import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheWinnerOfAnArrayGame as getWinner } from ".";

/** Plays the game with a real queue, stopping after enough rounds. */
const byBruteForce = (arr: number[], k: number): number => {
	const queue = [...arr];
	let [streak, champion] = [0, queue[0] ?? 0];
	for (let round = 0; round < 10 * arr.length + k && streak < k; round++) {
		const [a = 0, b = 0] = queue;
		const [winner, loser] = a > b ? [a, b] : [b, a];
		streak = winner === champion ? streak + 1 : 1;
		champion = winner;
		queue.splice(0, 2, winner);
		queue.push(loser);
	}
	return champion;
};

describe("1535. Find the Winner of an Array Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(getWinner([2, 1, 3, 5, 4, 6, 7], 2)).toBe(5);
		expect(getWinner([3, 2, 1], 10)).toBe(3);
	});

	it("matches playing the game on random inputs", () => {
		const random = createRandom(1535);
		for (let run = 0; run < 300; run++) {
			const arr = [...new Set(random.array(random.int(2, 10), 1, 50))];
			if (arr.length < 2) continue;
			const k = random.int(1, 12);
			expect(getWinner(arr, k)).toBe(byBruteForce(arr, k));
		}
	});
});
