import { describe, expect, it } from "bun:test";
import { numberOfNodesWithValueOne as numberOfNodes } from ".";

describe("2445. Number of Nodes With Value One", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfNodes(5, [1, 2, 5])).toBe(3);
		expect(numberOfNodes(3, [2, 3, 3])).toBe(1);
	});
});
