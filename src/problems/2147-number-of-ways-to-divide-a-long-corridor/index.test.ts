import { describe, expect, it } from "bun:test";
import { numberOfWaysToDivideALongCorridor as numberOfWays } from ".";

describe("2147. Number of Ways to Divide a Long Corridor", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays("SSPPSPS")).toBe(3);
		expect(numberOfWays("PPSPSP")).toBe(1);
		expect(numberOfWays("S")).toBe(0);
	});

	it("needs an even, non-zero number of seats", () => {
		expect(numberOfWays("PPP")).toBe(0);
		expect(numberOfWays("SSS")).toBe(0);
		expect(numberOfWays("SSPSS")).toBe(2);
	});
});
