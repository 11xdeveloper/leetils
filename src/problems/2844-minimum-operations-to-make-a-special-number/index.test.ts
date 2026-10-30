import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeASpecialNumber as minimumOperations } from ".";

describe("2844. Minimum Operations to Make a Special Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations("2245047")).toBe(2);
		expect(minimumOperations("2908305")).toBe(3);
		expect(minimumOperations("10")).toBe(1);
	});

	it("deletes everything when nothing works", () => {
		expect(minimumOperations("123")).toBe(3);
	});
});
