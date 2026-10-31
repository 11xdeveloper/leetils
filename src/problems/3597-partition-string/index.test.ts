import { describe, expect, it } from "bun:test";
import { partitionString } from ".";

describe("3597. Partition String", () => {
	it("solves the examples from the problem statement", () => {
		expect(partitionString("abbccccd")).toEqual([
			"a",
			"b",
			"bc",
			"c",
			"cc",
			"d",
		]);
		expect(partitionString("aaaa")).toEqual(["a", "aa"]);
	});
});
