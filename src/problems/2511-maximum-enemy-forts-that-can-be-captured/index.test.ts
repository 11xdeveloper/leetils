import { describe, expect, it } from "bun:test";
import { maximumEnemyFortsThatCanBeCaptured as captureForts } from ".";

describe("2511. Maximum Enemy Forts That Can Be Captured", () => {
	it("solves the examples from the problem statement", () => {
		expect(captureForts([1, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(4);
		expect(captureForts([0, 0, 1, -1])).toBe(0);
	});
});
