import { describe, expect, it } from "bun:test";
import { countMentionsPerUser as countMentions } from ".";

describe("3433. Count Mentions Per User", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countMentions(2, [
				["MESSAGE", "10", "id1 id0"],
				["OFFLINE", "11", "0"],
				["MESSAGE", "71", "HERE"],
			]),
		).toEqual([2, 2]);
		expect(
			countMentions(2, [
				["MESSAGE", "10", "id1 id0"],
				["OFFLINE", "11", "0"],
				["MESSAGE", "12", "ALL"],
			]),
		).toEqual([2, 2]);
		expect(
			countMentions(2, [
				["OFFLINE", "10", "0"],
				["MESSAGE", "12", "HERE"],
			]),
		).toEqual([0, 1]);
	});

	it("counts repeated mentions and processes offline first at the same time", () => {
		expect(
			countMentions(3, [
				["MESSAGE", "5", "HERE"],
				["OFFLINE", "5", "1"],
				["MESSAGE", "6", "id2 id2"],
			]),
		).toEqual([1, 0, 3]);
	});
});
