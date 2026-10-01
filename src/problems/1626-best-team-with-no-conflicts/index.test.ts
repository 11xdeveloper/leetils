import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTeamWithNoConflicts as bestTeamScore } from ".";

/** Tries every team. */
const byBruteForce = (scores: number[], ages: number[]): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << scores.length; mask++) {
		const team = scores.map((_, i) => i).filter((i) => mask & (1 << i));
		const conflict = team.some((i) =>
			team.some(
				(j) =>
					(ages[i] ?? 0) < (ages[j] ?? 0) &&
					(scores[i] ?? 0) > (scores[j] ?? 0),
			),
		);
		if (!conflict)
			best = Math.max(
				best,
				team.reduce((sum, i) => sum + (scores[i] ?? 0), 0),
			);
	}
	return best;
};

describe("1626. Best Team With No Conflicts", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestTeamScore([1, 3, 5, 10, 15], [1, 2, 3, 4, 5])).toBe(34);
		expect(bestTeamScore([4, 5, 6, 5], [2, 1, 2, 1])).toBe(16);
		expect(bestTeamScore([1, 2, 3, 5], [8, 9, 10, 1])).toBe(6);
	});

	it("matches trying every team on random inputs", () => {
		const random = createRandom(1626);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const [scores, ages] = [random.array(n, 1, 10), random.array(n, 1, 5)];
			expect(bestTeamScore(scores, ages)).toBe(byBruteForce(scores, ages));
		}
	});
});
