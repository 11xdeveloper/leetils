import { describe, expect, it } from "bun:test";
import { numberOfEmployeesWhoMetTheTarget as numberOfEmployeesWhoMetTarget } from ".";

describe("2798. Number of Employees Who Met the Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfEmployeesWhoMetTarget([0, 1, 2, 3, 4], 2)).toBe(3);
		expect(numberOfEmployeesWhoMetTarget([5, 1, 4, 2, 2], 6)).toBe(0);
	});
});
