import { describe, expect, it } from "bun:test";
import { walkingRobotSimulation as robotSim } from ".";

describe("874. Walking Robot Simulation", () => {
	it("solves the examples from the problem statement", () => {
		expect(robotSim([4, -1, 3], [])).toBe(25);
		expect(robotSim([4, -1, 4, -2, 4], [[2, 4]])).toBe(65);
		expect(robotSim([6, -1, -1, 6], [[0, 0]])).toBe(36);
	});
});
