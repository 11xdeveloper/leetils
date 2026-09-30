import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { findAllTheLonelyNodes as getLonelyNodes } from ".";

const sorted = (values: number[]) => values.toSorted((a, b) => a - b);

describe("1469. Find All The Lonely Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLonelyNodes(treeFromArray([1, 2, 3, null, 4]))).toEqual([4]);
		expect(
			sorted(
				getLonelyNodes(
					treeFromArray([
						7,
						1,
						4,
						6,
						null,
						5,
						3,
						null,
						null,
						null,
						null,
						null,
						2,
					]),
				),
			),
		).toEqual([2, 6]);
		expect(
			sorted(
				getLonelyNodes(
					treeFromArray([
						11,
						99,
						88,
						77,
						null,
						null,
						66,
						55,
						null,
						null,
						44,
						33,
						null,
						null,
						22,
					]),
				),
			),
		).toEqual([22, 33, 44, 55, 66, 77]);
	});

	it("has no lonely nodes in a single node or a full tree", () => {
		expect(getLonelyNodes(treeFromArray([1]))).toEqual([]);
		expect(getLonelyNodes(treeFromArray([1, 2, 3]))).toEqual([]);
	});
});
