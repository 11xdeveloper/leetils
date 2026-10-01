import { describe, expect, it } from "bun:test";
import { minimumTimeVisitingAllPoints as minTimeToVisitAllPoints } from ".";

describe("1266. Minimum Time Visiting All Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTimeToVisitAllPoints([
				[1, 1],
				[3, 4],
				[-1, 0],
			]),
		).toBe(7);
		expect(
			minTimeToVisitAllPoints([
				[3, 2],
				[-2, 2],
			]),
		).toBe(5);
	});

	it("takes no time for one point or repeated points", () => {
		expect(minTimeToVisitAllPoints([[5, 5]])).toBe(0);
		expect(
			minTimeToVisitAllPoints([
				[5, 5],
				[5, 5],
			]),
		).toBe(0);
	});
});
