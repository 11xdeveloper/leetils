/**
 * 2125. Number of Laser Beams in a Bank
 *
 * Each row of `bank` marks security devices with "1". A beam joins every
 * pair of devices on consecutive non-empty rows. Returns the number of
 * beams.
 *
 * Multiply the device counts of consecutive non-empty rows.
 *
 * @see https://leetcode.com/problems/number-of-laser-beams-in-a-bank/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfLaserBeamsInABank(["011001", "000000", "010100", "001000"]); // 8
 */
export const numberOfLaserBeamsInABank = (bank: readonly string[]): number => {
	let [beams, previous] = [0, 0];
	for (const row of bank) {
		const devices = row.split("1").length - 1;
		if (devices === 0) continue;
		beams += previous * devices;
		previous = devices;
	}
	return beams;
};
