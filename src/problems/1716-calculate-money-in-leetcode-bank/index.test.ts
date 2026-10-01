import { describe, expect, it } from "bun:test";
import { calculateMoneyInLeetcodeBank as totalMoney } from ".";

describe("1716. Calculate Money in Leetcode Bank", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalMoney(4)).toBe(10);
		expect(totalMoney(10)).toBe(37);
		expect(totalMoney(20)).toBe(96);
	});

	it("matches adding each day's deposit", () => {
		let total = 0;
		for (let day = 0; day < 1000; day++) {
			total += Math.floor(day / 7) + (day % 7) + 1;
			expect(totalMoney(day + 1)).toBe(total);
		}
	});
});
