import { describe, expect, it } from "bun:test";
import { determineColorOfAChessboardSquare as squareIsWhite } from ".";

describe("1812. Determine Color of a Chessboard Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(squareIsWhite("a1")).toBeFalse();
		expect(squareIsWhite("h3")).toBeTrue();
		expect(squareIsWhite("c7")).toBeFalse();
	});

	it("alternates along every rank and file", () => {
		for (let file = 0; file < 8; file++) {
			for (let rank = 1; rank <= 8; rank++) {
				expect(squareIsWhite(`${String.fromCharCode(97 + file)}${rank}`)).toBe(
					(file + rank) % 2 === 0,
				);
			}
		}
	});
});
