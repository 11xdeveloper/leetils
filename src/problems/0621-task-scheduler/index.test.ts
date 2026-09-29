import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { taskScheduler as leastInterval } from ".";

/** Breadth-first search over (remaining counts, cooldowns) states. */
const bySearch = (tasks: string[], n: number): number => {
	const names = [...new Set(tasks)];
	const start = [
		...names.map((name) => tasks.filter((task) => task === name).length),
		...names.map(() => 0),
	];
	const seen = new Set([start.join()]);
	let frontier = [start];
	for (let time = 0; ; time++) {
		const next: number[][] = [];
		for (const state of frontier) {
			if (state.slice(0, names.length).every((count) => count === 0))
				return time;
			const cooled = state.map((value, i) =>
				i >= names.length ? Math.max(0, value - 1) : value,
			);
			const options = [cooled];
			for (let t = 0; t < names.length; t++) {
				if ((state[t] ?? 0) > 0 && state[names.length + t] === 0) {
					const after = [...cooled];
					after[t] = (after[t] ?? 0) - 1;
					after[names.length + t] = n;
					options.push(after);
				}
			}
			for (const option of options) {
				if (!seen.has(option.join())) {
					seen.add(option.join());
					next.push(option);
				}
			}
		}
		frontier = next;
	}
};

describe("621. Task Scheduler", () => {
	it("solves the examples from the problem statement", () => {
		expect(leastInterval(["A", "A", "A", "B", "B", "B"], 2)).toBe(8);
		expect(leastInterval(["A", "C", "A", "B", "D", "B"], 1)).toBe(6);
		expect(leastInterval(["A", "A", "A", "B", "B", "B"], 3)).toBe(10);
	});

	it("matches searching every schedule on random inputs", () => {
		const random = createRandom(621);
		for (let run = 0; run < 200; run++) {
			const tasks = [...random.string(random.int(1, 8), "ABC")];
			const n = random.int(0, 3);
			expect(leastInterval(tasks, n)).toBe(bySearch(tasks, n));
		}
	});
});
