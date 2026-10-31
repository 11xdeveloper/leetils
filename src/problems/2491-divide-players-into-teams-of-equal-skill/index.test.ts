import { describe, expect, it } from "bun:test";
import { dividePlayersIntoTeamsOfEqualSkill as dividePlayers } from ".";

describe("2491. Divide Players Into Teams of Equal Skill", () => {
	it("solves the examples from the problem statement", () => {
		expect(dividePlayers([3, 2, 5, 1, 3, 4])).toBe(22);
		expect(dividePlayers([3, 4])).toBe(12);
		expect(dividePlayers([1, 1, 2, 3])).toBe(-1);
	});
});
