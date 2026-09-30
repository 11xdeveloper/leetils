/**
 * 1108. Defanging an IP Address
 *
 * Returns the IPv4 address `address` with every `.` replaced by `[.]`.
 *
 * A global string replacement.
 *
 * @see https://leetcode.com/problems/defanging-an-ip-address/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * defangingAnIpAddress("1.1.1.1"); // "1[.]1[.]1[.]1"
 */
export const defangingAnIpAddress = (address: string): string =>
	address.replaceAll(".", "[.]");
