/**
 * 3119. Maximum Number of Potholes That Can Be Fixed
 *
 * Fixing n consecutive potholes (`x`) on `road` costs n + 1. Returns the most
 * potholes fixable within `budget`.
 *
 * Every repair pays one extra, so fix the longest stretches first, whole,
 * and spend what's left on part of the next one. Bucket the stretch lengths
 * to sort them in linear time.
 *
 * @see https://leetcode.com/problems/maximum-number-of-potholes-that-can-be-fixed/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfPotholesThatCanBeFixed("..xxxxx", 4); // 3
 */
export const maximumNumberOfPotholesThatCanBeFixed = (
	road: string,
	budget: number,
): number => {
	const stretches = new Array<number>(road.length + 1).fill(0);
	let run = 0;
	for (const char of `${road}.`)
		if (char === "x") run++;
		else if (run > 0) {
			stretches[run] = (stretches[run] ?? 0) + 1;
			run = 0;
		}
	let left = budget;
	let fixed = 0;
	for (let length = road.length; length > 0 && left > 1; length--)
		for (
			let copies = stretches[length] ?? 0;
			copies > 0 && left > 1;
			copies--
		) {
			const take = Math.min(length, left - 1);
			fixed += take;
			left -= take + 1;
		}
	return fixed;
};
