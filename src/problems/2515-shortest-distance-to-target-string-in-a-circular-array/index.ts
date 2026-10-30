/**
 * 2515. Shortest Distance to Target String in a Circular Array
 *
 * Returns the fewest steps, left or right around the circular array, from
 * `startIndex` to a word equal to `target`, or -1 if there is none.
 *
 * Check each matching index's distance both ways round.
 *
 * @see https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * shortestDistanceToTargetStringInACircularArray(["hello", "i", "am", "leetcode", "hello"], "hello", 1); // 1
 */
export const shortestDistanceToTargetStringInACircularArray = (
	words: readonly string[],
	target: string,
	startIndex: number,
): number => {
	const n = words.length;
	let best = n;
	for (let i = 0; i < n; i++)
		if (words[i] === target) {
			const distance = Math.abs(i - startIndex);
			best = Math.min(best, distance, n - distance);
		}
	return best === n ? -1 : best;
};
