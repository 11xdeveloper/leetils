import { describe, expect, it } from "bun:test";
import { fairDistributionOfCookies as distributeCookies } from ".";

describe("2305. Fair Distribution of Cookies", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCookies([8, 15, 10, 20, 8], 2)).toBe(31);
		expect(distributeCookies([6, 1, 3, 2, 2, 4, 1, 2], 3)).toBe(7);
	});

	it("gives one bag per child when there are enough children", () => {
		expect(distributeCookies([5, 9, 2], 3)).toBe(9);
	});
});
