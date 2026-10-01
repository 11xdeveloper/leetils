/**
 * 831. Masking Personal Information
 *
 * Masks an email address or a phone number. An email becomes lowercase with
 * the name's middle letters replaced by five asterisks (`"l*****e@x.com"`).
 * A phone number keeps its last four digits as `"***-***-XXXX"`, prefixed
 * by `"+*-"`, `"+**-"` or `"+***-"` for 1–3 country code digits.
 *
 * An `@` means an email; otherwise the digits are extracted and counted.
 *
 * @see https://leetcode.com/problems/masking-personal-information/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maskingPersonalInformation("LeetCode@LeetCode.com"); // "l*****e@leetcode.com"
 */
export const maskingPersonalInformation = (s: string): string => {
	const at = s.indexOf("@");
	if (at !== -1) {
		const lower = s.toLowerCase();
		return `${lower.charAt(0)}*****${lower.charAt(at - 1)}${lower.slice(at)}`;
	}
	const digits = s.replace(/\D/g, "");
	const local = `***-***-${digits.slice(-4)}`;
	const country = digits.length - 10;
	return country === 0 ? local : `+${"*".repeat(country)}-${local}`;
};
