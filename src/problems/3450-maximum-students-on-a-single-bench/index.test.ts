import { describe, expect, it } from "bun:test";
import { maximumStudentsOnASingleBench as maxStudentsOnBench } from ".";

describe("3450. Maximum Students on a Single Bench", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxStudentsOnBench([
				[1, 2],
				[2, 2],
				[3, 3],
				[1, 3],
				[2, 3],
			]),
		).toBe(3);
		expect(
			maxStudentsOnBench([
				[1, 1],
				[2, 1],
				[3, 1],
				[4, 2],
				[5, 2],
			]),
		).toBe(3);
		expect(
			maxStudentsOnBench([
				[1, 1],
				[1, 1],
			]),
		).toBe(1);
		expect(maxStudentsOnBench([])).toBe(0);
	});
});
