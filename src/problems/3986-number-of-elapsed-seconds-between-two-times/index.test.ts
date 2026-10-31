import { describe, expect, it } from "bun:test";
import { numberOfElapsedSecondsBetweenTwoTimes as secondsBetweenTimes } from ".";

describe("3986. Number of Elapsed Seconds Between Two Times", () => {
	it("solves the examples from the problem statement", () => {
		expect(secondsBetweenTimes("01:00:00", "01:00:25")).toBe(25);
		expect(secondsBetweenTimes("12:34:56", "13:00:00")).toBe(1504);
	});
});
