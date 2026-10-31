import { describe, expect, it } from "bun:test";
import { countConnectedSubgraphsWithEvenNodeSum as evenSumSubgraphs } from ".";

describe("3910. Count Connected Subgraphs with Even Node Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			evenSumSubgraphs(
				[1, 0, 1],
				[
					[0, 1],
					[1, 2],
				],
			),
		).toBe(2);
		expect(evenSumSubgraphs([1], [])).toBe(0);
	});

	it("counts every connected set of a path of zeros", () => {
		expect(
			evenSumSubgraphs(
				[0, 0, 0, 0],
				[
					[0, 1],
					[1, 2],
					[2, 3],
				],
			),
		).toBe(10);
	});
});
