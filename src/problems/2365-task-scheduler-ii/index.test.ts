import { describe, expect, it } from "bun:test";
import { taskSchedulerII } from ".";

describe("2365. Task Scheduler II", () => {
	it("solves the examples from the problem statement", () => {
		expect(taskSchedulerII([1, 2, 1, 2, 3, 1], 3)).toBe(9);
		expect(taskSchedulerII([5, 8, 8, 5], 2)).toBe(6);
	});
});
