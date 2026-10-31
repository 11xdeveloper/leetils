import { describe, expect, it } from "bun:test";
import { keepMultiplyingFoundValuesByTwo as findFinalValue } from ".";

describe("2154. Keep Multiplying Found Values by Two", () => {
	it("solves the examples from the problem statement", () => {
		expect(findFinalValue([5, 3, 6, 1, 12], 3)).toBe(24);
		expect(findFinalValue([2, 7, 9], 4)).toBe(4);
	});
});
