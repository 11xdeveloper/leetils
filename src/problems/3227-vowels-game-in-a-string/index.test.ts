import { describe, expect, it } from "bun:test";
import { vowelsGameInAString as doesAliceWin } from ".";

describe("3227. Vowels Game in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(doesAliceWin("leetcoder")).toBeTrue();
		expect(doesAliceWin("bbcd")).toBeFalse();
	});
});
