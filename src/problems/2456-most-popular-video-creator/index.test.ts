import { describe, expect, it } from "bun:test";
import { mostPopularVideoCreator as mostPopularCreator } from ".";

describe("2456. Most Popular Video Creator", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostPopularCreator(
				["alice", "bob", "alice", "chris"],
				["one", "two", "three", "four"],
				[5, 10, 5, 4],
			),
		).toEqual([
			["alice", "one"],
			["bob", "two"],
		]);
		expect(
			mostPopularCreator(
				["alice", "alice", "alice"],
				["a", "b", "c"],
				[1, 2, 2],
			),
		).toEqual([["alice", "b"]]);
	});
});
