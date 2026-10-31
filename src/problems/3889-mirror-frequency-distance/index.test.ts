import { describe, expect, it } from "bun:test";
import { mirrorFrequencyDistance as mirrorFrequency } from ".";

describe("3889. Mirror Frequency Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(mirrorFrequency("ab1z9")).toBe(3);
		expect(mirrorFrequency("4m7n")).toBe(2);
		expect(mirrorFrequency("byby")).toBe(0);
	});
});
