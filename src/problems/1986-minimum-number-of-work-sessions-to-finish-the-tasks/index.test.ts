import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfWorkSessionsToFinishTheTasks as minSessions } from ".";

/** Tries every assignment of tasks to sessions. */
const byBruteForce = (tasks: number[], sessionTime: number): number => {
	let best = tasks.length;
	const loads: number[] = [];
	const assign = (i: number) => {
		if (loads.length >= best) return;
		if (i === tasks.length) {
			best = loads.length;
			return;
		}
		const time = tasks[i] ?? 0;
		for (let s = 0; s < loads.length; s++) {
			if ((loads[s] ?? 0) + time > sessionTime) continue;
			loads[s] = (loads[s] ?? 0) + time;
			assign(i + 1);
			loads[s] = (loads[s] ?? 0) - time;
		}
		loads.push(time);
		assign(i + 1);
		loads.pop();
	};
	assign(0);
	return best;
};

describe("1986. Minimum Number of Work Sessions to Finish the Tasks", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSessions([1, 2, 3], 3)).toBe(2);
		expect(minSessions([3, 1, 3, 1, 1], 8)).toBe(2);
		expect(minSessions([1, 2, 3, 4, 5], 15)).toBe(1);
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(1986);
		for (let run = 0; run < 200; run++) {
			const sessionTime = random.int(5, 15);
			const tasks = random.array(random.int(1, 8), 1, sessionTime);
			expect(minSessions(tasks, sessionTime)).toBe(
				byBruteForce(tasks, sessionTime),
			);
		}
	});
});
