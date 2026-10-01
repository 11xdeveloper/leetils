import { describe, expect, it } from "bun:test";
import {
	ExpressionTreeNode,
	expressionTreeFromArray,
	expressionTreeToArray,
} from "./expression-tree-node";

describe("ExpressionTreeNode", () => {
	it("defaults to a leaf holding a space", () => {
		const node = new ExpressionTreeNode();
		expect(node.val).toBe(" ");
		expect(node.left).toBeNull();
		expect(node.right).toBeNull();
	});
});

describe("expressionTreeFromArray", () => {
	it("reads LeetCode's level-order format", () => {
		const root = expressionTreeFromArray(["-", "*", "*", "3", "4", "2", "5"]);
		expect(root?.val).toBe("-");
		expect(root?.left?.right?.val).toBe("4");
		expect(root?.right?.left?.val).toBe("2");
	});

	it("returns null for an empty array", () => {
		expect(expressionTreeFromArray([])).toBeNull();
	});
});

describe("expressionTreeToArray", () => {
	it("round-trips trees with missing children", () => {
		const values = [
			"+",
			"-",
			"1",
			"2",
			"/",
			null,
			null,
			null,
			null,
			"3",
			"*",
			null,
			null,
			"5",
			"2",
		];
		expect(expressionTreeToArray(expressionTreeFromArray(values))).toEqual(
			values,
		);
	});

	it("returns an empty array for an empty tree", () => {
		expect(expressionTreeToArray(null)).toEqual([]);
	});
});
