import { describe, expect, it } from "bun:test";
import { repeatString } from ".";

describe("2796. Repeat String", () => {
	it("solves the examples from the problem statement", () => {
		expect(repeatString.call("hello", 2)).toBe("hellohello");
		expect(repeatString.call("code", 3)).toBe("codecodecode");
		expect(repeatString.call("js", 1)).toBe("js");
	});

	it("matches String.prototype.repeat", () => {
		for (let times = 0; times < 40; times++)
			expect(repeatString.call("ab", times)).toBe("ab".repeat(times));
	});
});
