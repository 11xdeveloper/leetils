import { describe, expect, it } from "bun:test";
import { splitWithMinimumSum as splitNum } from ".";

describe("2578. Split With Minimum Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitNum(4325)).toBe(59);
		expect(splitNum(687)).toBe(75);
	});
});
