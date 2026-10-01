import { describe, expect, it } from "bun:test";
import { countGoodNumbers } from ".";

describe("1922. Count Good Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodNumbers(1)).toBe(5);
		expect(countGoodNumbers(4)).toBe(400);
		expect(countGoodNumbers(50)).toBe(564908303);
	});

	it("matches counting digit strings for small n", () => {
		for (let n = 1; n <= 5; n++) {
			let count = 0;
			for (let value = 0; value < 10 ** n; value++) {
				const digits = String(value).padStart(n, "0");
				if (
					[...digits].every((d, i) =>
						i % 2 === 0 ? Number(d) % 2 === 0 : "2357".includes(d),
					)
				)
					count++;
			}
			expect(countGoodNumbers(n)).toBe(count);
		}
	});

	it("handles 10^15", () => {
		expect(countGoodNumbers(1e15)).toBeLessThan(1_000_000_007);
	});
});
