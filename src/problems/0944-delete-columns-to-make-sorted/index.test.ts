import { describe, expect, it } from "bun:test";
import { deleteColumnsToMakeSorted as minDeletionSize } from ".";

describe("944. Delete Columns to Make Sorted", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDeletionSize(["cba", "daf", "ghi"])).toBe(1);
		expect(minDeletionSize(["a", "b"])).toBe(0);
		expect(minDeletionSize(["zyx", "wvu", "tsr"])).toBe(3);
	});
});
