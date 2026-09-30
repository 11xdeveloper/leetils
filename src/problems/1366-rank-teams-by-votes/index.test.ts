import { describe, expect, it } from "bun:test";
import { rankTeamsByVotes as rankTeams } from ".";

describe("1366. Rank Teams by Votes", () => {
	it("solves the examples from the problem statement", () => {
		expect(rankTeams(["ABC", "ACB", "ABC", "ACB", "ACB"])).toBe("ACB");
		expect(rankTeams(["WXYZ", "XYZW"])).toBe("XWYZ");
		expect(rankTeams(["ZMNAGUEDSJYLBOPHRQICWFXTVK"])).toBe(
			"ZMNAGUEDSJYLBOPHRQICWFXTVK",
		);
	});

	it("falls back to alphabetical order on a full tie", () => {
		expect(rankTeams(["BCA", "CAB", "ABC"])).toBe("ABC");
	});
});
