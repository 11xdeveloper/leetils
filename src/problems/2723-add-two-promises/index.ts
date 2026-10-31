/**
 * 2723. Add Two Promises
 *
 * A promise for the sum of the numbers two promises resolve to.
 *
 * Await both, which runs them at the same time since they've already
 * started.
 *
 * @see https://leetcode.com/problems/add-two-promises/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * await addTwoPromises(Promise.resolve(2), Promise.resolve(5)); // 7
 */
export async function addTwoPromises(
	promise1: Promise<number>,
	promise2: Promise<number>,
): Promise<number> {
	const [a, b] = await Promise.all([promise1, promise2]);
	return a + b;
}
