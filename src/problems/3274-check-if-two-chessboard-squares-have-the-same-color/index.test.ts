import { describe, expect, it } from "bun:test";
import { checkIfTwoChessboardSquaresHaveTheSameColor as checkTwoChessboards } from ".";

describe("3274. Check if Two Chessboard Squares Have the Same Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkTwoChessboards("a1", "c3")).toBeTrue();
		expect(checkTwoChessboards("a1", "h3")).toBeFalse();
	});
});
