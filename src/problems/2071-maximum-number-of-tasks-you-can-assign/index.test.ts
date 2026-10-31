import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfTasksYouCanAssign as maxTaskAssign } from ".";

/** Tries giving each task to each free worker, with or without a pill. */
const byBruteForce = (
	tasks: number[],
	workers: number[],
	pills: number,
	strength: number,
): number => {
	const used = workers.map(() => false);
	const assign = (task: number, pillsLeft: number): number => {
		if (task === tasks.length) return 0;
		let best = assign(task + 1, pillsLeft);
		const need = tasks[task] ?? 0;
		for (const [w, worker] of workers.entries()) {
			if (used[w]) continue;
			used[w] = true;
			if (worker >= need)
				best = Math.max(best, 1 + assign(task + 1, pillsLeft));
			else if (pillsLeft > 0 && worker + strength >= need)
				best = Math.max(best, 1 + assign(task + 1, pillsLeft - 1));
			used[w] = false;
		}
		return best;
	};
	return assign(0, pills);
};

describe("2071. Maximum Number of Tasks You Can Assign", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTaskAssign([3, 2, 1], [0, 3, 3], 1, 1)).toBe(3);
		expect(maxTaskAssign([5, 4], [0, 0, 0], 1, 5)).toBe(1);
		expect(maxTaskAssign([10, 15, 30], [0, 10, 10, 10, 10], 3, 10)).toBe(2);
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(2071);
		for (let run = 0; run < 200; run++) {
			const tasks = random.array(random.int(1, 5), 0, 10);
			const workers = random.array(random.int(1, 5), 0, 10);
			const pills = random.int(0, 3);
			const strength = random.int(0, 6);
			expect(maxTaskAssign(tasks, workers, pills, strength)).toBe(
				byBruteForce(tasks, workers, pills, strength),
			);
		}
	});
});
