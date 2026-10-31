import { describe, expect, it } from "bun:test";
import { DesignAnAtmMachine as ATM } from ".";

describe("2241. Design an ATM Machine", () => {
	it("solves the example from the problem statement", () => {
		const atm = new ATM();
		atm.deposit([0, 0, 1, 2, 1]);
		expect(atm.withdraw(600)).toEqual([0, 0, 1, 0, 1]);
		atm.deposit([0, 1, 0, 1, 1]);
		expect(atm.withdraw(600)).toEqual([-1]);
		expect(atm.withdraw(550)).toEqual([0, 1, 0, 0, 1]);
	});

	it("doesn't fall back to smaller notes after a greedy failure", () => {
		const atm = new ATM();
		atm.deposit([3, 1, 0, 0, 0]);
		// Greedy takes the $50 and is left needing $10, though 3 × $20 = $60.
		expect(atm.withdraw(60)).toEqual([-1]);
		expect(atm.withdraw(70)).toEqual([1, 1, 0, 0, 0]);
	});
});
