import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToConvertTime as convertTime } from ".";

describe("2224. Minimum Number of Operations to Convert Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(convertTime("02:30", "04:35")).toBe(3);
		expect(convertTime("11:00", "11:01")).toBe(1);
	});
});
