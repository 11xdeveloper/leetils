/**
 * 751. IP to CIDR
 *
 * Returns the fewest CIDR blocks that together cover exactly the `n`
 * addresses starting at `ip`.
 *
 * Greedy from the first address: the largest block starting there is
 * limited by the address's alignment (its lowest set bit) and by how many
 * addresses are left, so it takes the largest power of two within both and
 * moves on. Addresses are handled as plain numbers, not 32-bit integers,
 * to avoid sign problems.
 *
 * @see https://leetcode.com/problems/ip-to-cidr/
 * @difficulty Medium
 * @timeComplexity O(log n) blocks
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * ipToCidr("255.0.0.7", 10); // ["255.0.0.7/32", "255.0.0.8/29", "255.0.0.16/32"]
 */
export const ipToCidr = (ip: string, n: number): string[] => {
	let address = ip
		.split(".")
		.reduce((value, part) => value * 256 + Number(part), 0);
	const format = (value: number): string =>
		[24, 16, 8, 0]
			.map((shift) => Math.floor(value / 2 ** shift) % 256)
			.join(".");

	const blocks: string[] = [];
	while (n > 0) {
		let size = 1;
		while (address % (size * 2) === 0 && size * 2 <= n && size < 2 ** 32)
			size *= 2;
		blocks.push(`${format(address)}/${32 - Math.log2(size)}`);
		address += size;
		n -= size;
	}
	return blocks;
};
