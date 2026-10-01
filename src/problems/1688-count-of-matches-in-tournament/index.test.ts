import { describe, expect, it } from "bun:test";
import { countOfMatchesInTournament as numberOfMatches } from ".";

describe("1688. Count of Matches in Tournament", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfMatches(7)).toBe(6);
		expect(numberOfMatches(14)).toBe(13);
	});

	it("matches simulating the rounds", () => {
		for (let n = 1; n <= 200; n++) {
			let [teams, matches] = [n, 0];
			while (teams > 1) {
				matches += Math.floor(teams / 2);
				teams = Math.ceil(teams / 2);
			}
			expect(numberOfMatches(n)).toBe(matches);
		}
	});
});
