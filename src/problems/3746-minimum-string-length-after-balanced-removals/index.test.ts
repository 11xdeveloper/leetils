import { describe, expect, it } from "bun:test";
import { minimumStringLengthAfterBalancedRemovals as minLengthAfterRemovals } from ".";

describe("3746. Minimum String Length After Balanced Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLengthAfterRemovals("aabbab")).toBe(0);
		expect(minLengthAfterRemovals("aaaa")).toBe(4);
		expect(minLengthAfterRemovals("aaabb")).toBe(1);
	});
});
