import { describe, expect, it } from "bun:test";
import { uniqueEmailAddresses as numUniqueEmails } from ".";

describe("929. Unique Email Addresses", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numUniqueEmails([
				"test.email+alex@leetcode.com",
				"test.e.mail+bob.cathy@leetcode.com",
				"testemail+david@lee.tcode.com",
			]),
		).toBe(2);
		expect(
			numUniqueEmails(["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"]),
		).toBe(3);
	});

	it("keeps dots in the domain", () => {
		expect(numUniqueEmails(["a@x.com", "a@xcom"])).toBe(2);
	});
});
