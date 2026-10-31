import { describe, expect, it } from "bun:test";
import { numberOfSeniorCitizens as countSeniors } from ".";

describe("2678. Number of Senior Citizens", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSeniors(["7868190130M7522", "5303914400F9211", "9273338290F4010"]),
		).toBe(2);
		expect(countSeniors(["1313579440F2036", "2921522980M5644"])).toBe(0);
	});
});
