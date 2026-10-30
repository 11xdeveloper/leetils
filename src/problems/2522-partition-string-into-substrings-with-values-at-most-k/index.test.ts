import { describe, expect, it } from "bun:test";
import { partitionStringIntoSubstringsWithValuesAtMostK as minimumPartition } from ".";

describe("2522. Partition String Into Substrings With Values at Most K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPartition("165462", 60)).toBe(4);
		expect(minimumPartition("238182", 5)).toBe(-1);
	});
});
