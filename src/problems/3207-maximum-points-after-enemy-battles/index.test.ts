import { describe, expect, it } from "bun:test";
import { maximumPointsAfterEnemyBattles as maximumPoints } from ".";

describe("3207. Maximum Points After Enemy Battles", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumPoints([3, 2, 2], 2)).toBe(3);
		expect(maximumPoints([2], 10)).toBe(5);
	});

	it("scores nothing if the weakest enemy is too strong", () => {
		expect(maximumPoints([5, 6], 4)).toBe(0);
	});
});
