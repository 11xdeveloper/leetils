/**
 * 605. Can Place Flowers
 *
 * `flowerbed` marks planted plots with 1 and empty ones with 0, and no two
 * flowers may be adjacent. Returns whether `n` more flowers can be planted.
 *
 * Greedy from the left: plant in every empty plot whose neighbours are
 * empty. Planting as early as possible never blocks more plots than it
 * needs to.
 *
 * @see https://leetcode.com/problems/can-place-flowers/
 * @difficulty Easy
 * @timeComplexity O(m) for m plots
 * @spaceComplexity O(1)
 *
 * @example
 * canPlaceFlowers([1, 0, 0, 0, 1], 1); // true
 */
export const canPlaceFlowers = (
	flowerbed: readonly number[],
	n: number,
): boolean => {
	let planted = 0;
	let previousPlanted = false;
	for (let i = 0; i < flowerbed.length && planted < n; i++) {
		if (flowerbed[i] === 1) {
			previousPlanted = true;
		} else if (!previousPlanted && flowerbed[i + 1] !== 1) {
			planted++;
			previousPlanted = true;
		} else {
			previousPlanted = false;
		}
	}
	return planted >= n;
};
