import { describe, expect, it } from "bun:test";
import { airplaneSeatAssignmentProbability as nthPersonGetsNthSeat } from ".";

/**
 * The exact recurrence: the first passenger takes their own seat (last
 * passenger is fine), the last seat (they aren't), or seat k, which leaves
 * passenger k in the first passenger's position with n − k + 1 people left.
 */
const exact = (n: number): number => {
	const p = [0, 1];
	for (let m = 2; m <= n; m++) {
		let total = 1;
		for (let k = 2; k < m; k++) total += p[m - k + 1] ?? 0;
		p[m] = total / m;
	}
	return p[n] ?? 0;
};

describe("1227. Airplane Seat Assignment Probability", () => {
	it("solves the examples from the problem statement", () => {
		expect(nthPersonGetsNthSeat(1)).toBe(1);
		expect(nthPersonGetsNthSeat(2)).toBe(0.5);
	});

	it("matches the exact recurrence up to 200 passengers", () => {
		for (let n = 1; n <= 200; n++)
			expect(nthPersonGetsNthSeat(n)).toBeCloseTo(exact(n), 9);
	});
});
