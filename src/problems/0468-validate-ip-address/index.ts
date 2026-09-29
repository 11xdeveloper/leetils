/**
 * 468. Validate IP Address
 *
 * Returns `"IPv4"` if `queryIP` is a valid IPv4 address, `"IPv6"` if it's a
 * valid IPv6 address and `"Neither"` otherwise.
 *
 * IPv4 is four decimal numbers from 0 to 255 separated by dots, with no
 * leading zeros. IPv6 is eight groups of 1 to 4 hexadecimal digits
 * separated by colons, where leading zeros are allowed. Each group is
 * checked with a regular expression.
 *
 * @see https://leetcode.com/problems/validate-ip-address/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validateIpAddress("172.16.254.1"); // "IPv4"
 */
export const validateIpAddress = (
	queryIP: string,
): "IPv4" | "IPv6" | "Neither" => {
	const ipv4 = queryIP.split(".");
	if (
		ipv4.length === 4 &&
		ipv4.every((part) => /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) <= 255)
	) {
		return "IPv4";
	}

	const ipv6 = queryIP.split(":");
	if (ipv6.length === 8 && ipv6.every((part) => /^[\da-fA-F]{1,4}$/.test(part)))
		return "IPv6";

	return "Neither";
};
