import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { processTasksUsingServers as assignTasks } from ".";

/** Simulates second by second with a queue of waiting tasks. */
const bySimulation = (servers: number[], tasks: number[]): number[] => {
	const freeAt = servers.map(() => 0);
	const answer: number[] = [];
	const waiting: number[] = [];
	let next = 0;
	for (let time = 0; answer.length < tasks.length; time++) {
		if (next < tasks.length && next <= time) waiting.push(next++);
		while (waiting.length > 0) {
			const available = servers
				.map((_, i) => i)
				.filter((i) => (freeAt[i] ?? 0) <= time);
			if (available.length === 0) break;
			available.sort((a, b) => (servers[a] ?? 0) - (servers[b] ?? 0) || a - b);
			const task = waiting.shift() ?? 0;
			const server = available[0] ?? 0;
			freeAt[server] = time + (tasks[task] ?? 0);
			answer[task] = server;
		}
	}
	return answer;
};

describe("1882. Process Tasks Using Servers", () => {
	it("solves the examples from the problem statement", () => {
		expect(assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2])).toEqual([
			2, 2, 0, 2, 1, 2,
		]);
		expect(assignTasks([5, 1, 4, 3, 2], [2, 1, 2, 4, 5, 2, 1])).toEqual([
			1, 4, 1, 4, 1, 3, 2,
		]);
	});

	it("matches a second-by-second simulation on random inputs", () => {
		const random = createRandom(1882);
		for (let run = 0; run < 200; run++) {
			const servers = random.array(random.int(1, 4), 1, 5);
			const tasks = random.array(random.int(1, 12), 1, 6);
			expect(assignTasks(servers, tasks)).toEqual(bySimulation(servers, tasks));
		}
	});
});
