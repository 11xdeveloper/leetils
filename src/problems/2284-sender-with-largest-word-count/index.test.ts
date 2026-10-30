import { describe, expect, it } from "bun:test";
import { senderWithLargestWordCount as largestWordCount } from ".";

describe("2284. Sender With Largest Word Count", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestWordCount(
				[
					"Hello userTwooo",
					"Hi userThree",
					"Wonderful day Alice",
					"Nice day userThree",
				],
				["Alice", "userTwo", "userThree", "Alice"],
			),
		).toBe("Alice");
		expect(
			largestWordCount(
				["How is leetcode for everyone", "Leetcode is useful for practice"],
				["Bob", "Charlie"],
			),
		).toBe("Charlie");
	});
});
