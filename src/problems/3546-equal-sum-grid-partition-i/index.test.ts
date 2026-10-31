import { describe, expect, it } from "bun:test";
import { equalSumGridPartitionI as canPartitionGrid } from ".";

describe("3546. Equal Sum Grid Partition I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canPartitionGrid([
				[1, 4],
				[2, 3],
			]),
		).toBeTrue();
		expect(
			canPartitionGrid([
				[1, 3],
				[2, 4],
			]),
		).toBeFalse();
	});
});
