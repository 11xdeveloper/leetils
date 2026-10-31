import { describe, expect, it } from "bun:test";
import { minimizeTheMaximumWaitingTimeAtSynchronizedTrafficLights as minPenalty } from ".";

describe("4025. Minimize the Maximum Waiting Time at Synchronized Traffic Lights", () => {
	it("solves the examples from the problem statement", () => {
		expect(minPenalty(8, [2, 3], [2, 5, 8, 11])).toBe(5);
		expect(minPenalty(10, [3, 6, 8], [4, 9, 15])).toBe(1);
		expect(minPenalty(5, [2], [2, 3, 4, 5, 6])).toBe(3);
	});
});
