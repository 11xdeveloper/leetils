import { describe, expect, it } from "bun:test";
import { maximizeTheConfusionOfAnExam as maxConsecutiveAnswers } from ".";

describe("2024. Maximize the Confusion of an Exam", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxConsecutiveAnswers("TTFF", 2)).toBe(4);
		expect(maxConsecutiveAnswers("TFFT", 1)).toBe(3);
		expect(maxConsecutiveAnswers("TTFTTFTT", 1)).toBe(5);
	});

	it("handles a single kind of answer", () => {
		expect(maxConsecutiveAnswers("FFFF", 1)).toBe(4);
	});
});
