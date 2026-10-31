import { describe, expect, it } from "bun:test";
import { processStringWithSpecialOperationsI as processStr } from ".";

describe("3612. Process String with Special Operations I", () => {
	it("solves the examples from the problem statement", () => {
		expect(processStr("a#b%*")).toBe("ba");
		expect(processStr("z*#")).toBe("");
	});
});
