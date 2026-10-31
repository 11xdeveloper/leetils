import { describe, expect, it } from "bun:test";
import { checkGoodInteger } from ".";

describe("3959. Check Good Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkGoodInteger(1000)).toBeFalse();
		expect(checkGoodInteger(19)).toBeTrue();
	});
});
