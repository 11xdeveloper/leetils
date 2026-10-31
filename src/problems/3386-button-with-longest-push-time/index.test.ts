import { describe, expect, it } from "bun:test";
import { buttonWithLongestPushTime as buttonWithLongestTime } from ".";

describe("3386. Button with Longest Push Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			buttonWithLongestTime([
				[1, 2],
				[2, 5],
				[3, 9],
				[1, 15],
			]),
		).toBe(1);
		expect(
			buttonWithLongestTime([
				[10, 5],
				[1, 7],
			]),
		).toBe(10);
	});
});
