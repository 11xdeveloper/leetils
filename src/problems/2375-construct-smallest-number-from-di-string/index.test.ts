import { describe, expect, it } from "bun:test";
import { constructSmallestNumberFromDiString as smallestNumber } from ".";

describe("2375. Construct Smallest Number From DI String", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestNumber("IIIDIDDD")).toBe("123549876");
		expect(smallestNumber("DDD")).toBe("4321");
	});
});
