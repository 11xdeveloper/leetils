import { describe, expect, it } from "bun:test";
import { reportSpamMessage } from ".";

describe("3295. Report Spam Message", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			reportSpamMessage(["hello", "world", "leetcode"], ["world", "hello"]),
		).toBeTrue();
		expect(
			reportSpamMessage(
				["hello", "programming", "fun"],
				["world", "programming", "leetcode"],
			),
		).toBeFalse();
	});

	it("counts repeated banned words", () => {
		expect(reportSpamMessage(["a", "a"], ["a"])).toBeTrue();
	});
});
