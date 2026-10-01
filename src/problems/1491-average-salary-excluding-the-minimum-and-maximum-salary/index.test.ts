import { describe, expect, it } from "bun:test";
import { averageSalaryExcludingTheMinimumAndMaximumSalary as average } from ".";

describe("1491. Average Salary Excluding the Minimum and Maximum Salary", () => {
	it("solves the examples from the problem statement", () => {
		expect(average([4000, 3000, 1000, 2000])).toBeCloseTo(2500);
		expect(average([1000, 2000, 3000])).toBeCloseTo(2000);
	});

	it("averages fractional results", () => {
		expect(average([1000, 1001, 1002, 5000])).toBeCloseTo(1001.5);
	});
});
