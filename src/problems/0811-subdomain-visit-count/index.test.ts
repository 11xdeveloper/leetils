import { describe, expect, it } from "bun:test";
import { subdomainVisitCount as subdomainVisits } from ".";

describe("811. Subdomain Visit Count", () => {
	it("solves the examples from the problem statement", () => {
		expect(subdomainVisits(["9001 discuss.leetcode.com"]).sort()).toEqual([
			"9001 com",
			"9001 discuss.leetcode.com",
			"9001 leetcode.com",
		]);
		expect(
			subdomainVisits([
				"900 google.mail.com",
				"50 yahoo.com",
				"1 intel.mail.com",
				"5 wiki.org",
			]).sort(),
		).toEqual(
			[
				"901 mail.com",
				"50 yahoo.com",
				"900 google.mail.com",
				"5 wiki.org",
				"5 org",
				"1 intel.mail.com",
				"951 com",
			].sort(),
		);
	});
});
