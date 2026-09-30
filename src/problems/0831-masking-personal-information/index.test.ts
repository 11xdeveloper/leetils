import { describe, expect, it } from "bun:test";
import { maskingPersonalInformation as maskPII } from ".";

describe("831. Masking Personal Information", () => {
	it("solves the examples from the problem statement", () => {
		expect(maskPII("LeetCode@LeetCode.com")).toBe("l*****e@leetcode.com");
		expect(maskPII("AB@qq.com")).toBe("a*****b@qq.com");
		expect(maskPII("1(234)567-890")).toBe("***-***-7890");
	});

	it("masks country codes of every length", () => {
		expect(maskPII("+1 (234) 567-8901")).toBe("+*-***-***-8901");
		expect(maskPII("86-(10)12345678")).toBe("+**-***-***-5678");
		expect(maskPII("+123 456 789 0123")).toBe("+***-***-***-0123");
	});
});
