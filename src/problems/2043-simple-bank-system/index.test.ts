import { describe, expect, it } from "bun:test";
import { SimpleBankSystem as Bank } from ".";

describe("2043. Simple Bank System", () => {
	it("solves the example from the problem statement", () => {
		const bank = new Bank([10, 100, 20, 50, 30]);
		expect(bank.withdraw(3, 10)).toBeTrue();
		expect(bank.transfer(5, 1, 20)).toBeTrue();
		expect(bank.deposit(5, 20)).toBeTrue();
		expect(bank.transfer(3, 4, 15)).toBeFalse();
		expect(bank.withdraw(10, 50)).toBeFalse();
	});

	it("leaves balances alone when a transfer fails", () => {
		const bank = new Bank([10, 0]);
		expect(bank.transfer(1, 3, 5)).toBeFalse();
		expect(bank.withdraw(1, 10)).toBeTrue();
		expect(bank.withdraw(0, 0)).toBeFalse();
		expect(bank.transfer(2, 1, 0)).toBeTrue();
	});
});
