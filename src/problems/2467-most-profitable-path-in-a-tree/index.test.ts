import { describe, expect, it } from "bun:test";
import { mostProfitablePathInATree as mostProfitablePath } from ".";

describe("2467. Most Profitable Path in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostProfitablePath(
				[
					[0, 1],
					[1, 2],
					[1, 3],
					[3, 4],
				],
				3,
				[-2, 4, 2, -4, 6],
			),
		).toBe(6);
		expect(mostProfitablePath([[0, 1]], 1, [-7280, 2350])).toBe(-7280);
	});
});
