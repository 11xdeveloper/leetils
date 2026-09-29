import { describe, expect, it } from "bun:test";
import { nextClosestTime } from ".";

describe("681. Next Closest Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextClosestTime("19:34")).toBe("19:39");
		expect(nextClosestTime("23:59")).toBe("22:22");
	});

	it("returns the same time when every digit is equal", () => {
		expect(nextClosestTime("11:11")).toBe("11:11");
		expect(nextClosestTime("00:00")).toBe("00:00");
	});

	it("wraps across hours and midnight", () => {
		expect(nextClosestTime("01:59")).toBe("05:00");
		expect(nextClosestTime("13:55")).toBe("15:11");
	});
});
