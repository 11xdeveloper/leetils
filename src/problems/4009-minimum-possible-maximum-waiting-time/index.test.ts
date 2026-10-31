import { describe, expect, it } from "bun:test";
import { minimumPossibleMaximumWaitingTime as minMaxWaitingTime } from ".";

describe("4009. Minimum Possible Maximum Waiting Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMaxWaitingTime([6, 8, 4, 6, 5], [16, 13])).toBe(6);
		expect(minMaxWaitingTime([10, 15], [12, 17])).toBe(0);
		expect(minMaxWaitingTime([10, 5], [8, 8])).toBe(-1);
	});
});
