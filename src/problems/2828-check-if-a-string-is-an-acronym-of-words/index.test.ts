import { describe, expect, it } from "bun:test";
import { checkIfAStringIsAnAcronymOfWords as isAcronym } from ".";

describe("2828. Check if a String Is an Acronym of Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(isAcronym(["alice", "bob", "charlie"], "abc")).toBe(true);
		expect(isAcronym(["an", "apple"], "a")).toBe(false);
		expect(
			isAcronym(["never", "gonna", "give", "up", "on", "you"], "ngguoy"),
		).toBe(true);
	});
});
