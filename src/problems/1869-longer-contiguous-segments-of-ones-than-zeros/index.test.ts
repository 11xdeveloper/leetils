import { describe, expect, it } from "bun:test";
import { longerContiguousSegmentsOfOnesThanZeros as checkZeroOnes } from ".";

describe("1869. Longer Contiguous Segments of Ones than Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkZeroOnes("1101")).toBeTrue();
		expect(checkZeroOnes("111000")).toBeFalse();
		expect(checkZeroOnes("110100010")).toBeFalse();
	});
});
