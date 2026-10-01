import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumInitialEnergyToFinishTasks as minimumEffort } from ".";

/** Tries every order of the tasks. */
const byBruteForce = (tasks: number[][]): number => {
	let best = Infinity;
	const orders: number[][][] = [];
	const collect = (left: number[][], order: number[][]) => {
		if (left.length === 0) orders.push(order);
		for (const [i, task] of left.entries())
			collect(
				left.filter((_, j) => j !== i),
				[...order, task],
			);
	};
	collect(tasks, []);
	for (const order of orders) {
		let energy = 0;
		// Work backward: each task needs its minimum, and enough to cover what follows.
		for (const [actual = 0, minimum = 0] of order.toReversed())
			energy = Math.max(energy + actual, minimum);
		best = Math.min(best, energy);
	}
	return best;
};

describe("1665. Minimum Initial Energy to Finish Tasks", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumEffort([
				[1, 2],
				[2, 4],
				[4, 8],
			]),
		).toBe(8);
		expect(
			minimumEffort([
				[1, 3],
				[2, 4],
				[10, 11],
				[10, 12],
				[8, 9],
			]),
		).toBe(32);
		expect(
			minimumEffort([
				[1, 7],
				[2, 8],
				[3, 9],
				[4, 10],
				[5, 11],
				[6, 12],
			]),
		).toBe(27);
	});

	it("matches trying every order on random inputs", () => {
		const random = createRandom(1665);
		for (let run = 0; run < 200; run++) {
			const tasks = Array.from({ length: random.int(1, 6) }, () => {
				const actual = random.int(1, 10);
				return [actual, random.int(actual, 15)];
			});
			expect(minimumEffort(tasks)).toBe(byBruteForce(tasks));
		}
	});
});
