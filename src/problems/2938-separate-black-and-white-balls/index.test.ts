import { describe, expect, it } from "bun:test";
import { separateBlackAndWhiteBalls as minimumSteps } from ".";

describe("2938. Separate Black and White Balls", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSteps("101")).toBe(1);
		expect(minimumSteps("100")).toBe(2);
		expect(minimumSteps("0111")).toBe(0);
	});
});
