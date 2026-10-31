import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { totalScoreOfDungeonRuns as totalScore } from ".";

/** Simulates every run. */
const byBruteForce = (
	hp: number,
	damage: number[],
	requirement: number[],
): number => {
	let total = 0;
	for (let i = 0; i < damage.length; i++) {
		let left = hp;
		for (let j = i; j < damage.length; j++) {
			left -= damage[j] ?? 0;
			if (left >= (requirement[j] ?? 0)) total++;
		}
	}
	return total;
};

describe("3771. Total Score of Dungeon Runs", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalScore(11, [3, 6, 7], [4, 2, 5])).toBe(3);
		expect(totalScore(2, [10000, 1], [1, 1])).toBe(1);
	});

	it("matches simulating every run on random dungeons", () => {
		const random = createRandom(3771);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const hp = random.int(1, 30);
			const damage = random.array(n, 1, 8);
			const requirement = random.array(n, 1, 10);
			expect(totalScore(hp, damage, requirement)).toBe(
				byBruteForce(hp, damage, requirement),
			);
		}
	});
});
