/**
 * 277. Find the Celebrity
 *
 * Among `n` people, a celebrity is known by everyone else and knows no one.
 * Given `knows(a, b)`, which says whether `a` knows `b`, returns a function
 * that finds the celebrity among people 0 to `n - 1`, or returns -1 if there
 * isn't one. As in LeetCode's JavaScript version, the solution is built from
 * the `knows` API.
 *
 * Each question rules someone out: if the candidate knows `i`, the candidate
 * isn't the celebrity, and `i` becomes the candidate; otherwise `i` isn't. A
 * second pass checks the one candidate left. At most 3n questions are
 * asked, as the follow-up asks.
 *
 * @see https://leetcode.com/problems/find-the-celebrity/
 * @difficulty Medium
 * @timeComplexity O(n) calls to knows
 * @spaceComplexity O(1)
 *
 * @example
 * findTheCelebrity(knows)(3); // 1 when people 0 and 2 know 1, and 1 knows no one
 */
export const findTheCelebrity =
	(knows: (a: number, b: number) => boolean): ((n: number) => number) =>
	(n) => {
		let candidate = 0;
		for (let i = 1; i < n; i++) if (knows(candidate, i)) candidate = i;

		for (let i = 0; i < n; i++) {
			if (i === candidate) continue;
			if (knows(candidate, i) || !knows(i, candidate)) return -1;
		}

		return candidate;
	};
