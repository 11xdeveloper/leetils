import { describe, expect, it } from "bun:test";
import { slowestKey } from ".";

describe("1629. Slowest Key", () => {
	it("solves the examples from the problem statement", () => {
		expect(slowestKey([9, 29, 49, 50], "cbcd")).toBe("c");
		expect(slowestKey([12, 23, 36, 46, 62], "spuda")).toBe("a");
	});

	it("breaks ties with the largest key", () => {
		expect(slowestKey([5, 10], "ba")).toBe("b");
	});
});
