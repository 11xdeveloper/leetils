import { describe, expect, it } from "bun:test";
import { findTheValueOfThePartition as findValueOfPartition } from ".";

describe("2740. Find the Value of the Partition", () => {
	it("solves the examples from the problem statement", () => {
		expect(findValueOfPartition([1, 3, 2, 4])).toBe(1);
		expect(findValueOfPartition([100, 1, 10])).toBe(9);
	});
});
