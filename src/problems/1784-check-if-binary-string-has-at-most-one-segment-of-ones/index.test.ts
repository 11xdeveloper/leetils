import { describe, expect, it } from "bun:test";
import { checkIfBinaryStringHasAtMostOneSegmentOfOnes as checkOnesSegment } from ".";

describe("1784. Check if Binary String Has at Most One Segment of Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkOnesSegment("1001")).toBeFalse();
		expect(checkOnesSegment("110")).toBeTrue();
	});
});
