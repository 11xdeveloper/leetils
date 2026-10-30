import { describe, expect, it } from "bun:test";
import { minimumTimeToKillAllMonsters as minimumTime } from ".";

describe("2403. Minimum Time to Kill All Monsters", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime([3, 1, 4])).toBe(4);
		expect(minimumTime([1, 1, 4])).toBe(4);
		expect(minimumTime([1, 2, 4, 9])).toBe(6);
	});
});
