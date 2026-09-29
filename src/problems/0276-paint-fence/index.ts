/**
 * 276. Paint Fence
 *
 * Returns how many ways there are to paint a fence of `n` posts with `k`
 * colours, where no three posts in a row share a colour.
 *
 * Tracks the ways ending with the last two posts the same colour and the
 * ways ending with them different. A new post can differ from the last in
 * `k - 1` ways from either; it can match the last only if the two before it
 * differed.
 *
 * @see https://leetcode.com/problems/paint-fence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * paintFence(3, 2); // 6
 */
export const paintFence = (n: number, k: number): number => {
	let same = 0;
	let different = k;

	for (let post = 2; post <= n; post++) {
		[same, different] = [different, (same + different) * (k - 1)];
	}

	return same + different;
};
