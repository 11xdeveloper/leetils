/**
 * 374. Guess Number Higher or Lower
 *
 * A number from 1 to `n` has been picked. Given `guess(num)`, which returns
 * -1 if `num` is too high, 1 if too low and 0 if right, returns a function
 * that finds the picked number. As in LeetCode's JavaScript version, the
 * solution is built from the `guess` API.
 *
 * Binary search, halving the range with each guess.
 *
 * @see https://leetcode.com/problems/guess-number-higher-or-lower/
 * @difficulty Easy
 * @timeComplexity O(log n) calls to guess
 * @spaceComplexity O(1)
 *
 * @example
 * guessNumberHigherOrLower((num) => Math.sign(6 - num))(10); // 6
 */
export const guessNumberHigherOrLower =
	(guess: (num: number) => number): ((n: number) => number) =>
	(n) => {
		let low = 1;
		let high = n;

		while (low < high) {
			const mid = low + Math.floor((high - low) / 2);
			const result = guess(mid);
			if (result === 0) return mid;
			if (result < 0) high = mid - 1;
			else low = mid + 1;
		}

		return low;
	};
