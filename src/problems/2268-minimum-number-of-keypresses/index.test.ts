import { describe, expect, it } from "bun:test";
import { minimumNumberOfKeypresses as minimumKeypresses } from ".";

describe("2268. Minimum Number of Keypresses", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumKeypresses("apple")).toBe(5);
		expect(minimumKeypresses("abcdefghijkl")).toBe(15);
	});
});
