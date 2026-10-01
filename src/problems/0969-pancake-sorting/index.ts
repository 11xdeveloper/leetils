/**
 * 969. Pancake Sorting
 *
 * A pancake flip of `k` reverses the first `k` elements. Returns flip sizes
 * that sort the permutation `arr` of 1 to `n`, using at most `10 · n`
 * flips. Any such sequence is accepted.
 *
 * For each value from `n` down, flips it to the front and then flips it
 * into its final place: at most `2n` flips.
 *
 * @see https://leetcode.com/problems/pancake-sorting/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * pancakeSorting([3, 2, 4, 1]); // [3, 4, 2, 3, 1, 2]
 */
export const pancakeSorting = (arr: readonly number[]): number[] => {
	const pancakes = [...arr];
	const flip = (k: number): void => {
		const top = pancakes.slice(0, k).reverse();
		pancakes.splice(0, k, ...top);
	};
	const flips: number[] = [];
	for (let size = pancakes.length; size > 1; size--) {
		const at = pancakes.indexOf(size);
		if (at === size - 1) continue;
		if (at > 0) {
			flip(at + 1);
			flips.push(at + 1);
		}
		flip(size);
		flips.push(size);
	}
	return flips;
};
