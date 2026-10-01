/**
 * 470. Implement Rand10() Using Rand7()
 *
 * Given `rand7`, which returns a uniformly random integer from 1 to 7,
 * returns a `rand10` function that returns a uniformly random integer from 1
 * to 10, using only `rand7`. As in LeetCode's JavaScript version, `rand7` is
 * passed in.
 *
 * Rejection sampling: two calls give one of 49 equally likely outcomes. The
 * first 40 map evenly onto 1 to 10; the other 9 are thrown away and it tries
 * again.
 *
 * @see https://leetcode.com/problems/implement-rand10-using-rand7/
 * @difficulty Medium
 * @timeComplexity O(1) expected, about 2.45 calls to rand7
 * @spaceComplexity O(1)
 *
 * @example
 * const rand10 = implementRand10UsingRand7(rand7);
 * rand10(); // 1 to 10, each with probability 1/10
 */
export const implementRand10UsingRand7 =
	(rand7: () => number): (() => number) =>
	() => {
		for (;;) {
			const outcome = (rand7() - 1) * 7 + rand7() - 1;
			if (outcome < 40) return (outcome % 10) + 1;
		}
	};
