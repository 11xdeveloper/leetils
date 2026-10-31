import { describe, expect, it } from "bun:test";
import { altAndTabSimulation as simulationResult } from ".";

describe("3237. Alt and Tab Simulation", () => {
	it("solves the examples from the problem statement", () => {
		expect(simulationResult([1, 2, 3], [3, 3, 2])).toEqual([2, 3, 1]);
		expect(simulationResult([1, 4, 2, 3], [4, 1, 3])).toEqual([3, 1, 4, 2]);
	});
});
