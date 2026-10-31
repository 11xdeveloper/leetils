import { describe, expect, it } from "bun:test";
import { calculateDelayedArrivalTime as findDelayedArrivalTime } from ".";

describe("2651. Calculate Delayed Arrival Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(findDelayedArrivalTime(15, 5)).toBe(20);
		expect(findDelayedArrivalTime(13, 11)).toBe(0);
	});
});
