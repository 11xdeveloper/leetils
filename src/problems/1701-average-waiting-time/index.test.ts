import { describe, expect, it } from "bun:test";
import { averageWaitingTime } from ".";

describe("1701. Average Waiting Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			averageWaitingTime([
				[1, 2],
				[2, 5],
				[4, 3],
			]),
		).toBeCloseTo(5);
		expect(
			averageWaitingTime([
				[5, 2],
				[5, 4],
				[10, 3],
				[20, 1],
			]),
		).toBeCloseTo(3.25);
	});
});
