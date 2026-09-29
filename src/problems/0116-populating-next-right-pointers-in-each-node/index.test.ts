import { describe, expect, it } from "bun:test";
import {
	nextPointersToArray,
	treeWithNextFromArray,
} from "../../structures/tree-node-with-next";
import { populatingNextRightPointersInEachNode as connect } from ".";

describe("116. Populating Next Right Pointers in Each Node", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			nextPointersToArray(
				connect(treeWithNextFromArray([1, 2, 3, 4, 5, 6, 7])),
			),
		).toEqual([1, "#", 2, 3, "#", 4, 5, 6, 7, "#"]);
		expect(connect(null)).toBeNull();
	});

	it("handles a single node", () => {
		expect(nextPointersToArray(connect(treeWithNextFromArray([1])))).toEqual([
			1,
			"#",
		]);
	});

	it("links every level of perfect trees up to the constraint's depth", () => {
		for (let depth = 1; depth <= 12; depth++) {
			const size = 2 ** depth - 1;
			const root = connect(
				treeWithNextFromArray(Array.from({ length: size }, (_, i) => i)),
			);
			const expected = Array.from({ length: depth }, (_, level) => [
				...Array.from({ length: 2 ** level }, (_, i) => 2 ** level - 1 + i),
				"#" as const,
			]).flat();
			expect(nextPointersToArray(root)).toEqual(expected);
		}
	});
});
