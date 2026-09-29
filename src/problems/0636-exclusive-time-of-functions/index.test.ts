import { describe, expect, it } from "bun:test";
import { exclusiveTimeOfFunctions as exclusiveTime } from ".";

describe("636. Exclusive Time of Functions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			exclusiveTime(2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]),
		).toEqual([3, 4]);
		expect(
			exclusiveTime(1, [
				"0:start:0",
				"0:start:2",
				"0:end:5",
				"0:start:6",
				"0:end:6",
				"0:end:7",
			]),
		).toEqual([8]);
		expect(
			exclusiveTime(2, [
				"0:start:0",
				"0:start:2",
				"0:end:5",
				"1:start:6",
				"1:end:6",
				"0:end:7",
			]),
		).toEqual([7, 1]);
	});

	it("handles functions that start and end in the same unit", () => {
		expect(exclusiveTime(1, ["0:start:3", "0:end:3"])).toEqual([1]);
	});
});
