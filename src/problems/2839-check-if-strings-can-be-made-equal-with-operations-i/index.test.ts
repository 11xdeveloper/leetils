import { describe, expect, it } from "bun:test";
import { checkIfStringsCanBeMadeEqualWithOperationsI as canBeEqual } from ".";

describe("2839. Check if Strings Can be Made Equal With Operations I", () => {
	it("solves the examples from the problem statement", () => {
		expect(canBeEqual("abcd", "cdab")).toBe(true);
		expect(canBeEqual("abcd", "dacb")).toBe(false);
	});
});
