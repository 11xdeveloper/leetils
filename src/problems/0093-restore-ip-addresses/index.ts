const isValidPart = (part: string): boolean =>
	part.length > 0 &&
	part.length <= 3 &&
	(part === "0" || part[0] !== "0") &&
	Number(part) <= 255;

/**
 * 93. Restore IP Addresses
 *
 * Returns every valid IPv4 address that can be made by inserting three dots
 * into the digit string `s`. Each of the four parts must be 0–255 with no
 * leading zeros.
 *
 * Tries every length from 1 to 3 for each of the first three parts; the
 * fourth part is whatever remains. That's at most 27 candidates.
 *
 * @see https://leetcode.com/problems/restore-ip-addresses/
 * @difficulty Medium
 * @timeComplexity O(1), since there are at most 27 ways to split s
 * @spaceComplexity O(1)
 *
 * @example
 * restoreIpAddresses("25525511135"); // ["255.255.11.135", "255.255.111.35"]
 */
export const restoreIpAddresses = (s: string): string[] => {
	const addresses: string[] = [];

	for (let a = 1; a <= 3; a++) {
		for (let b = a + 1; b <= a + 3; b++) {
			for (let c = b + 1; c <= b + 3; c++) {
				const parts = [s.slice(0, a), s.slice(a, b), s.slice(b, c), s.slice(c)];
				if (parts.every(isValidPart)) addresses.push(parts.join("."));
			}
		}
	}

	return addresses;
};
