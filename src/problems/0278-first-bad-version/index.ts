/**
 * 278. First Bad Version
 *
 * Versions 1 to `n` are built one on another, so once a version is bad,
 * every later version is too. Given `isBadVersion`, returns a function that
 * finds the first bad version among 1 to `n`, calling `isBadVersion` as few
 * times as possible. As in LeetCode's JavaScript version, the solution is
 * built from the `isBadVersion` API.
 *
 * Binary search for the first version that is bad.
 *
 * @see https://leetcode.com/problems/first-bad-version/
 * @difficulty Easy
 * @timeComplexity O(log n) calls to isBadVersion
 * @spaceComplexity O(1)
 *
 * @example
 * firstBadVersion((version) => version >= 4)(5); // 4
 */
export const firstBadVersion =
	(isBadVersion: (version: number) => boolean): ((n: number) => number) =>
	(n) => {
		let low = 1;
		let high = n;

		while (low < high) {
			const mid = low + Math.floor((high - low) / 2);
			if (isBadVersion(mid)) high = mid;
			else low = mid + 1;
		}

		return low;
	};
