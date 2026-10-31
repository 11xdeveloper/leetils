import { describe, expect, it } from "bun:test";
import { removeColoredPiecesIfBothNeighborsAreTheSameColor as aliceWins } from ".";

describe("2038. Remove Colored Pieces if Both Neighbors are the Same Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(aliceWins("AAABABB")).toBeTrue();
		expect(aliceWins("AA")).toBeFalse();
		expect(aliceWins("ABBBBBBBAAA")).toBeFalse();
	});

	it("lets Bob win ties", () => {
		expect(aliceWins("AAABBB")).toBeFalse();
		expect(aliceWins("AAAABBB")).toBeTrue();
	});
});
