/**
 * 2899. Last Visited Integers
 *
 * Walking through `nums`, each -1 asks for the `k`-th most recent
 * positive integer seen, where `k` counts the -1s in a row so far.
 * Returns the answers, using -1 when there aren't enough integers.
 *
 * Keep the integers seen and the length of the current run of -1s.
 *
 * @see https://leetcode.com/problems/last-visited-integers/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lastVisitedIntegers([1, -1, 2, -1, -1]); // [1, 2, 1]
 */
export const lastVisitedIntegers = (nums: readonly number[]): number[] => {
	const seen: number[] = [];
	const answers: number[] = [];
	let run = 0;
	for (const num of nums) {
		if (num === -1) {
			run++;
			answers.push(seen[seen.length - run] ?? -1);
		} else {
			run = 0;
			seen.push(num);
		}
	}
	return answers;
};
