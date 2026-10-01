import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMinimumTimeToFinishAllJobs as minimumTimeRequired } from ".";

/** Tries every assignment of jobs to workers. */
const byBruteForce = (jobs: number[], k: number): number => {
	const loads = new Array<number>(k).fill(0);
	let best = Infinity;
	const assign = (i: number) => {
		if (i === jobs.length) {
			best = Math.min(best, Math.max(...loads));
			return;
		}
		for (let w = 0; w < k; w++) {
			loads[w] = (loads[w] ?? 0) + (jobs[i] ?? 0);
			assign(i + 1);
			loads[w] = (loads[w] ?? 0) - (jobs[i] ?? 0);
		}
	};
	assign(0);
	return best;
};

describe("1723. Find Minimum Time to Finish All Jobs", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTimeRequired([3, 2, 3], 3)).toBe(3);
		expect(minimumTimeRequired([1, 2, 4, 7, 8], 2)).toBe(11);
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(1723);
		for (let run = 0; run < 100; run++) {
			const jobs = random.array(random.int(1, 7), 1, 20);
			const k = random.int(1, Math.min(3, jobs.length));
			expect(minimumTimeRequired(jobs, k)).toBe(byBruteForce(jobs, k));
		}
	});

	it("handles 12 jobs", () => {
		expect(
			minimumTimeRequired([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 4),
		).toBe(20);
	});
});
