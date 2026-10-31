import { describe, expect, it } from "bun:test";
import { DesignExamScoresTracker } from ".";

describe("3709. Design Exam Scores Tracker", () => {
	it("solves the examples from the problem statement", () => {
		const tracker = new DesignExamScoresTracker();
		tracker.record(1, 98);
		expect(tracker.totalScore(1, 1)).toBe(98);
		tracker.record(5, 99);
		expect(tracker.totalScore(1, 3)).toBe(98);
		expect(tracker.totalScore(1, 5)).toBe(197);
		expect(tracker.totalScore(3, 4)).toBe(0);
		expect(tracker.totalScore(2, 5)).toBe(99);
	});
});
