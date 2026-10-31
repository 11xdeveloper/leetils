import { describe, expect, it } from "bun:test";
import { FindConsecutiveIntegersFromADataStream as DataStream } from ".";

describe("2526. Find Consecutive Integers from a Data Stream", () => {
	it("solves the example from the problem statement", () => {
		const stream = new DataStream(4, 3);
		expect(stream.consec(4)).toBe(false);
		expect(stream.consec(4)).toBe(false);
		expect(stream.consec(4)).toBe(true);
		expect(stream.consec(3)).toBe(false);
	});
});
