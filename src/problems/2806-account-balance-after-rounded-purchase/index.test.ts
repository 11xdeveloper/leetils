import { describe, expect, it } from "bun:test";
import { accountBalanceAfterRoundedPurchase as accountBalanceAfterPurchase } from ".";

describe("2806. Account Balance After Rounded Purchase", () => {
	it("solves the examples from the problem statement", () => {
		expect(accountBalanceAfterPurchase(9)).toBe(90);
		expect(accountBalanceAfterPurchase(15)).toBe(80);
	});

	it("rounds down below a half", () => {
		expect(accountBalanceAfterPurchase(14)).toBe(90);
		expect(accountBalanceAfterPurchase(0)).toBe(100);
	});
});
