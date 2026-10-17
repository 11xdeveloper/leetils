import { describe, expect, it } from "bun:test";
import { minimumMovesToConvertString as minimumMoves } from ".";

describe("2027. Minimum Moves to Convert String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumMoves("XXX")).toBe(1);
		expect(minimumMoves("XXOX")).toBe(2);
		expect(minimumMoves("OOOO")).toBe(0);
	});
});
