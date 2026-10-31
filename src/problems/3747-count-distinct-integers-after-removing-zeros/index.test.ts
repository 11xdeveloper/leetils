import { describe, expect, it } from "bun:test";
import { countDistinctIntegersAfterRemovingZeros as countDistinct } from ".";

describe("3747. Count Distinct Integers After Removing Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDistinct(10)).toBe(9);
		expect(countDistinct(3)).toBe(3);
	});

	it("matches removing zeros from every number", () => {
		const seen = new Set<string>();
		for (let n = 1; n <= 3000; n++) {
			seen.add(String(n).replaceAll("0", ""));
			expect(countDistinct(n)).toBe(seen.size);
		}
	});
});
