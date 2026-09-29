import { describe, expect, it } from "bun:test";
import { poorPigs } from ".";

describe("458. Poor Pigs", () => {
	it("solves the examples from the problem statement", () => {
		expect(poorPigs(4, 15, 15)).toBe(2);
		expect(poorPigs(4, 15, 30)).toBe(2);
		expect(poorPigs(1000, 15, 60)).toBe(5);
	});

	it("needs no pigs for a single bucket", () => {
		expect(poorPigs(1, 1, 1)).toBe(0);
	});

	it("needs exactly enough pigs at each power of the outcomes", () => {
		for (const outcomes of [2, 3, 5]) {
			for (let pigs = 1; outcomes ** pigs <= 1000; pigs++) {
				expect(poorPigs(outcomes ** pigs, 10, (outcomes - 1) * 10)).toBe(pigs);
				expect(poorPigs(outcomes ** pigs + 1, 10, (outcomes - 1) * 10)).toBe(
					pigs + 1,
				);
			}
		}
	});
});
