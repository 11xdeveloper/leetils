import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDifficultyOfAJobSchedule as minDifficulty } from ".";

/** Tries every set of d − 1 cuts. */
const byBruteForce = (jobs: number[], d: number): number => {
	let best = Infinity;
	for (let cuts = 0; cuts < 2 ** (jobs.length - 1); cuts++) {
		let days = 1;
		for (let rest = cuts; rest > 0; rest &= rest - 1) days++;
		if (days !== d) continue;
		let [total, hardest] = [0, 0];
		jobs.forEach((job, i) => {
			hardest = Math.max(hardest, job);
			if (i === jobs.length - 1 || cuts & (1 << i)) {
				total += hardest;
				hardest = 0;
			}
		});
		best = Math.min(best, total);
	}
	return best === Infinity ? -1 : best;
};

describe("1335. Minimum Difficulty of a Job Schedule", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDifficulty([6, 5, 4, 3, 2, 1], 2)).toBe(7);
		expect(minDifficulty([9, 9, 9], 4)).toBe(-1);
		expect(minDifficulty([1, 1, 1], 3)).toBe(3);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1335);
		for (let run = 0; run < 300; run++) {
			const jobs = random.array(random.int(1, 10), 0, 20);
			const d = random.int(1, 6);
			expect(minDifficulty(jobs, d)).toBe(byBruteForce(jobs, d));
		}
	});
});
