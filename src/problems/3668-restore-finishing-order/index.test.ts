import { describe, expect, it } from "bun:test";
import { restoreFinishingOrder as recoverOrder } from ".";

describe("3668. Restore Finishing Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(recoverOrder([3, 1, 2, 5, 4], [1, 3, 4])).toEqual([3, 1, 4]);
		expect(recoverOrder([1, 4, 5, 3, 2], [2, 5])).toEqual([5, 2]);
	});
});
