import { describe, expect, it } from "bun:test";
import { minimumCostToSplitIntoOnes as minCost } from ".";

describe("3857. Minimum Cost to Split into Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost(3)).toBe(3);
		expect(minCost(4)).toBe(6);
	});

	it("matches trying every split", () => {
		const best = [0, 0];
		for (let x = 2; x <= 30; x++) {
			let value = Number.POSITIVE_INFINITY;
			for (let a = 1; a < x; a++)
				value = Math.min(
					value,
					a * (x - a) + (best[a] ?? 0) + (best[x - a] ?? 0),
				);
			best.push(value);
			expect(minCost(x)).toBe(value);
		}
	});
});
