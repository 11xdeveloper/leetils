import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { rootEqualsSumOfChildren as checkTree } from ".";

describe("2236. Root Equals Sum of Children", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkTree(treeFromArray([10, 4, 6]))).toBeTrue();
		expect(checkTree(treeFromArray([5, 3, 1]))).toBeFalse();
	});
});
