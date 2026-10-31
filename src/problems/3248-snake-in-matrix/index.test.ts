import { describe, expect, it } from "bun:test";
import { snakeInMatrix as finalPositionOfSnake } from ".";

describe("3248. Snake in Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(finalPositionOfSnake(2, ["RIGHT", "DOWN"])).toBe(3);
		expect(finalPositionOfSnake(3, ["DOWN", "RIGHT", "UP"])).toBe(1);
	});
});
