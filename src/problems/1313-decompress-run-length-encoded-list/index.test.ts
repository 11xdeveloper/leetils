import { describe, expect, it } from "bun:test";
import { decompressRunLengthEncodedList as decompressRLElist } from ".";

describe("1313. Decompress Run-Length Encoded List", () => {
	it("solves the examples from the problem statement", () => {
		expect(decompressRLElist([1, 2, 3, 4])).toEqual([2, 4, 4, 4]);
		expect(decompressRLElist([1, 1, 2, 3])).toEqual([1, 3, 3]);
	});

	it("repeats values up to 100 times", () => {
		expect(decompressRLElist([100, 7])).toEqual(new Array<number>(100).fill(7));
	});
});
