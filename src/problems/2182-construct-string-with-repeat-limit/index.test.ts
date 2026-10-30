import { describe, expect, it } from "bun:test";
import { constructStringWithRepeatLimit as repeatLimitedString } from ".";

describe("2182. Construct String With Repeat Limit", () => {
	it("solves the examples from the problem statement", () => {
		expect(repeatLimitedString("cczazcc", 3)).toBe("zzcccac");
		expect(repeatLimitedString("aababab", 2)).toBe("bbabaa");
	});

	it("stops when only the limited letter remains", () => {
		expect(repeatLimitedString("aaaa", 1)).toBe("a");
		expect(repeatLimitedString("abc", 1)).toBe("cba");
	});
});
