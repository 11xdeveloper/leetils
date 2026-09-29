/**
 * 672. Bulb Switcher II
 *
 * `n` bulbs start on. Four buttons flip all bulbs, the even-numbered ones,
 * the odd-numbered ones, and those numbered `3k + 1`. Returns how many
 * different states are possible after exactly `presses` presses.
 *
 * Pressing a button twice undoes it, so only which buttons are pressed an
 * odd number of times matters, and the buttons' patterns repeat every 6
 * bulbs, with the first 3 bulbs determining the rest. Working through the
 * few cases gives a small table.
 *
 * @see https://leetcode.com/problems/bulb-switcher-ii/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * bulbSwitcherII(3, 1); // 4
 */
export const bulbSwitcherII = (n: number, presses: number): number => {
	if (presses === 0) return 1;
	if (n === 1) return 2;
	if (n === 2) return presses === 1 ? 3 : 4;
	if (presses === 1) return 4;
	return presses === 2 ? 7 : 8;
};
