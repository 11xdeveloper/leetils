import { describe, expect, it } from "bun:test";
import { maximumRunningTimeOfNComputers as maxRunTime } from ".";

describe("2141. Maximum Running Time of N Computers", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxRunTime(2, [3, 3, 3])).toBe(4);
		expect(maxRunTime(2, [1, 1, 1, 1])).toBe(2);
	});

	it("dedicates oversized batteries", () => {
		expect(maxRunTime(2, [100, 1, 2])).toBe(3);
		expect(maxRunTime(3, [10, 10, 3, 5])).toBe(8);
	});
});
