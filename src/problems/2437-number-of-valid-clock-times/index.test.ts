import { describe, expect, it } from "bun:test";
import { numberOfValidClockTimes as countTime } from ".";

describe("2437. Number of Valid Clock Times", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTime("?5:00")).toBe(2);
		expect(countTime("0?:0?")).toBe(100);
		expect(countTime("??:??")).toBe(1440);
	});
});
