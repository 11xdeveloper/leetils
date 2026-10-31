import { describe, expect, it } from "bun:test";
import { checkIfThereIsAValidPartitionForTheArray as validPartition } from ".";

describe("2369. Check if There is a Valid Partition For The Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(validPartition([4, 4, 4, 5, 6])).toBeTrue();
		expect(validPartition([1, 1, 1, 2])).toBeFalse();
	});

	it("needs every element covered", () => {
		expect(validPartition([1, 2, 3])).toBeTrue();
		expect(validPartition([1, 2])).toBeFalse();
	});
});
