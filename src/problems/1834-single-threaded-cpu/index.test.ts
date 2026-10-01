import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { singleThreadedCpu as getOrder } from ".";

/** Picks each task by scanning all waiting tasks. */
const bySimulation = (tasks: number[][]): number[] => {
	const done = new Set<number>();
	const order: number[] = [];
	let time = 0;
	while (order.length < tasks.length) {
		let pick = -1;
		for (const [i, [enqueue = 0, processing = 0]] of tasks.entries()) {
			if (done.has(i) || enqueue > time) continue;
			if (pick === -1 || processing < (tasks[pick]?.[1] ?? 0)) pick = i;
		}
		if (pick === -1) {
			time = Math.min(
				...tasks.filter((_, i) => !done.has(i)).map(([enqueue = 0]) => enqueue),
			);
			continue;
		}
		done.add(pick);
		order.push(pick);
		time += tasks[pick]?.[1] ?? 0;
	}
	return order;
};

describe("1834. Single-Threaded CPU", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getOrder([
				[1, 2],
				[2, 4],
				[3, 2],
				[4, 1],
			]),
		).toEqual([0, 2, 3, 1]);
		expect(
			getOrder([
				[7, 10],
				[7, 12],
				[7, 5],
				[7, 4],
				[7, 2],
			]),
		).toEqual([4, 3, 2, 0, 1]);
	});

	it("matches scanning the waiting tasks on random inputs", () => {
		const random = createRandom(1834);
		for (let run = 0; run < 300; run++) {
			const tasks = Array.from({ length: random.int(1, 10) }, () => [
				random.int(1, 20),
				random.int(1, 5),
			]);
			expect(getOrder(tasks)).toEqual(bySimulation(tasks));
		}
	});
});
