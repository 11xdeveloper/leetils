import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { earliestFinishTimeForLandAndWaterRidesII as earliestFinishTime } from ".";

/** Tries every pair of rides in both orders. */
const byBruteForce = (
	ls: number[],
	ld: number[],
	ws: number[],
	wd: number[],
): number => {
	let best = Number.POSITIVE_INFINITY;
	ls.forEach((a, i) => {
		ws.forEach((b, j) => {
			best = Math.min(
				best,
				Math.max(a + (ld[i] ?? 0), b) + (wd[j] ?? 0),
				Math.max(b + (wd[j] ?? 0), a) + (ld[i] ?? 0),
			);
		});
	});
	return best;
};

describe("3635. Earliest Finish Time for Land and Water Rides II", () => {
	it("solves the examples from the problem statement", () => {
		expect(earliestFinishTime([2, 8], [4, 1], [6], [3])).toBe(9);
		expect(earliestFinishTime([5], [3], [1], [10])).toBe(14);
	});

	it("matches trying every pair on random rides", () => {
		const random = createRandom(3635);
		for (let run = 0; run < 200; run++) {
			const [n, m] = [random.int(1, 5), random.int(1, 5)];
			const args = [
				random.array(n, 1, 20),
				random.array(n, 1, 10),
				random.array(m, 1, 20),
				random.array(m, 1, 10),
			] as const;
			expect(earliestFinishTime(...args)).toBe(byBruteForce(...args));
		}
	});
});
