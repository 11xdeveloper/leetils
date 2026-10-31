import { describe, expect, it } from "bun:test";
import { computeDecimalRepresentation as decimalRepresentation } from ".";

describe("3697. Compute Decimal Representation", () => {
	it("solves the examples from the problem statement", () => {
		expect(decimalRepresentation(537)).toEqual([500, 30, 7]);
		expect(decimalRepresentation(102)).toEqual([100, 2]);
		expect(decimalRepresentation(6)).toEqual([6]);
	});
});
