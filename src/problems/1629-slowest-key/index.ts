/**
 * 1629. Slowest Key
 *
 * Each key in `keysPressed` is held from the previous release until
 * `releaseTimes[i]`. Returns the key with the longest press, the largest
 * key on ties.
 *
 * One pass comparing (duration, key).
 *
 * @see https://leetcode.com/problems/slowest-key/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * slowestKey([9, 29, 49, 50], "cbcd"); // "c"
 */
export const slowestKey = (
	releaseTimes: readonly number[],
	keysPressed: string,
): string => {
	let [key, longest] = ["", 0];
	for (let i = 0; i < keysPressed.length; i++) {
		const duration = (releaseTimes[i] ?? 0) - (releaseTimes[i - 1] ?? 0);
		const current = keysPressed[i] ?? "";
		if (duration > longest || (duration === longest && current > key))
			[key, longest] = [current, duration];
	}
	return key;
};
