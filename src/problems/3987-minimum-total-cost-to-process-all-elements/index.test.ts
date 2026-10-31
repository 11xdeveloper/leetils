import { describe, expect, it } from "bun:test";
import { minimumTotalCostToProcessAllElements as minimumCost } from ".";

describe("3987. Minimum Total Cost to Process All Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost([1, 2, 3, 4], 4)).toBe(3);
		expect(minimumCost([1, 1, 7, 14], 4)).toBe(15);
		expect(minimumCost([1, 2, 3, 4], 10)).toBe(0);
	});

	it("reduces huge costs modulo 1e9+7", () => {
		const c = 10n ** 14n - 1n;
		expect(minimumCost(new Array(100000).fill(1e9), 1)).toBe(
			Number(((c * (c + 1n)) / 2n) % 1_000_000_007n),
		);
	});
});
