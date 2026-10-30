import { describe, expect, it } from "bun:test";
import { checkIfStringsCanBeMadeEqualWithOperationsII as checkStrings } from ".";

describe("2840. Check if Strings Can be Made Equal With Operations II", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkStrings("abcdba", "cabdab")).toBe(true);
		expect(checkStrings("abe", "bea")).toBe(false);
	});
});
