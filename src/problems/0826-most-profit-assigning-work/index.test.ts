import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mostProfitAssigningWork as maxProfitAssignment } from ".";

describe("826. Most Profit Assigning Work", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxProfitAssignment([2, 4, 6, 8, 10], [10, 20, 30, 40, 50], [4, 5, 6, 7]),
		).toBe(100);
		expect(maxProfitAssignment([85, 47, 57], [24, 66, 99], [40, 25, 25])).toBe(
			0,
		);
	});

	it("matches checking every job for every worker on random inputs", () => {
		const random = createRandom(826);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 6);
			const difficulty = random.array(n, 1, 10);
			const profit = random.array(n, 1, 10);
			const worker = random.array(random.int(1, 6), 1, 10);
			const expected = worker.reduce(
				(total, ability) =>
					total +
					Math.max(
						0,
						...difficulty.flatMap((d, i) =>
							d <= ability ? [profit[i] ?? 0] : [],
						),
					),
				0,
			);
			expect(maxProfitAssignment(difficulty, profit, worker)).toBe(expected);
		}
	});
});
