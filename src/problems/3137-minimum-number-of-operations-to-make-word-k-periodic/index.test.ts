import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeWordKPeriodic as minimumOperationsToMakeKPeriodic } from ".";

describe("3137. Minimum Number of Operations to Make Word K-Periodic", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperationsToMakeKPeriodic("leetcodeleet", 4)).toBe(1);
		expect(minimumOperationsToMakeKPeriodic("leetcoleet", 2)).toBe(3);
	});
});
