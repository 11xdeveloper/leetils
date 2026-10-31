/**
 * 2621. Sleep
 *
 * A promise that resolves after `millis` milliseconds.
 *
 * Resolve from a `setTimeout` callback.
 *
 * @see https://leetcode.com/problems/sleep/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * await sleep(100); // resolves after 100ms
 */
export function sleep(millis: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
