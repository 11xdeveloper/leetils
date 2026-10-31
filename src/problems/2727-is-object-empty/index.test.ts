import { describe, expect, it } from "bun:test";
import { isObjectEmpty } from ".";

describe("2727. Is Object Empty", () => {
	it("solves the examples from the problem statement", () => {
		expect(isObjectEmpty({ x: 5, y: 42 })).toBeFalse();
		expect(isObjectEmpty({})).toBeTrue();
		expect(isObjectEmpty([null, false, 0])).toBeFalse();
		expect(isObjectEmpty([])).toBeTrue();
	});
});
