import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumVacationDays as maxVacationDays } from ".";

/** Tries every sequence of cities. */
const byBruteForce = (flights: number[][], days: number[][]): number => {
	const weeks = days[0]?.length ?? 0;
	const search = (city: number, week: number): number => {
		if (week === weeks) return 0;
		let best = 0;
		for (let to = 0; to < flights.length; to++) {
			if (to === city || flights[city]?.[to] === 1)
				best = Math.max(best, (days[to]?.[week] ?? 0) + search(to, week + 1));
		}
		return best;
	};
	return search(0, 0);
};

describe("568. Maximum Vacation Days", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxVacationDays(
				[
					[0, 1, 1],
					[1, 0, 1],
					[1, 1, 0],
				],
				[
					[1, 3, 1],
					[6, 0, 3],
					[3, 3, 3],
				],
			),
		).toBe(12);
		expect(
			maxVacationDays(
				[
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				],
				[
					[1, 1, 1],
					[7, 7, 7],
					[7, 7, 7],
				],
			),
		).toBe(3);
		expect(
			maxVacationDays(
				[
					[0, 1, 1],
					[1, 0, 1],
					[1, 1, 0],
				],
				[
					[7, 0, 0],
					[0, 7, 0],
					[0, 0, 7],
				],
			),
		).toBe(21);
	});

	it("matches trying every route on random inputs", () => {
		const random = createRandom(568);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 4);
			const weeks = random.int(1, 4);
			const flights = Array.from({ length: n }, (_, i) =>
				Array.from({ length: n }, (_, j) => (i === j ? 0 : random.int(0, 1))),
			);
			const days = Array.from({ length: n }, () => random.array(weeks, 0, 7));
			expect(maxVacationDays(flights, days)).toBe(byBruteForce(flights, days));
		}
	});
});
