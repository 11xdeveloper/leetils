import { describe, expect, it } from "bun:test";
import { destroyingAsteroids as asteroidsDestroyed } from ".";

describe("2126. Destroying Asteroids", () => {
	it("solves the examples from the problem statement", () => {
		expect(asteroidsDestroyed(10, [3, 9, 19, 5, 21])).toBeTrue();
		expect(asteroidsDestroyed(5, [4, 9, 23, 4])).toBeFalse();
	});
});
