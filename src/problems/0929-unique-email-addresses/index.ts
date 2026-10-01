/**
 * 929. Unique Email Addresses
 *
 * Counts the distinct addresses that actually receive mail. In the local
 * name (before `@`), dots are ignored and everything from the first `+` is
 * dropped; the domain is used as is.
 *
 * Normalises each address and counts the distinct results.
 *
 * @see https://leetcode.com/problems/unique-email-addresses/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(total length)
 *
 * @example
 * uniqueEmailAddresses(["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]); // 2
 */
export const uniqueEmailAddresses = (emails: readonly string[]): number =>
	new Set(
		emails.map((email) => {
			const at = email.indexOf("@");
			const local = email.slice(0, at).split("+")[0]?.replaceAll(".", "") ?? "";
			return `${local}${email.slice(at)}`;
		}),
	).size;
