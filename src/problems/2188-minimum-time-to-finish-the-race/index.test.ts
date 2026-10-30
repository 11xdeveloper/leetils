import { describe, expect, it } from "bun:test";
import { minimumTimeToFinishTheRace as minimumFinishTime } from ".";

describe("2188. Minimum Time to Finish the Race", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumFinishTime(
				[
					[2, 3],
					[3, 4],
				],
				5,
				4,
			),
		).toBe(21);
		expect(
			minimumFinishTime(
				[
					[1, 10],
					[2, 2],
					[3, 4],
				],
				6,
				5,
			),
		).toBe(25);
	});

	it("keeps a tire that never slows down", () => {
		expect(minimumFinishTime([[5, 1]], 100, 1000)).toBe(5000);
	});
});
