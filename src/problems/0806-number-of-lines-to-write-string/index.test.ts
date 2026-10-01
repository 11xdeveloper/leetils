import { describe, expect, it } from "bun:test";
import { numberOfLinesToWriteString as numberOfLines } from ".";

describe("806. Number of Lines To Write String", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfLines(new Array(26).fill(10), "abcdefghijklmnopqrstuvwxyz"),
		).toEqual([3, 60]);
		expect(
			numberOfLines([4, ...new Array(25).fill(10)], "bbbcccdddaaa"),
		).toEqual([2, 4]);
	});

	it("fills a line to exactly 100 before moving on", () => {
		expect(numberOfLines(new Array(26).fill(10), "a".repeat(20))).toEqual([
			2, 100,
		]);
	});
});
