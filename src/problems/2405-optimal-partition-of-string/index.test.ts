import { describe, expect, it } from "bun:test";
import { optimalPartitionOfString as partitionString } from ".";

describe("2405. Optimal Partition of String", () => {
	it("solves the examples from the problem statement", () => {
		expect(partitionString("abacaba")).toBe(4);
		expect(partitionString("ssssss")).toBe(6);
	});
});
