import { describe, expect, it } from "bun:test";
import { minimumAdditionsToMakeValidString as addMinimum } from ".";

describe("2645. Minimum Additions to Make Valid String", () => {
	it("solves the examples from the problem statement", () => {
		expect(addMinimum("b")).toBe(2);
		expect(addMinimum("aaa")).toBe(6);
		expect(addMinimum("abc")).toBe(0);
	});
});
