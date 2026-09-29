/**
 * 406. Queue Reconstruction by Height
 *
 * Each person `[h, k]` has height `h` and exactly `k` people in front of
 * them who are at least as tall. Returns the queue that satisfies everyone.
 *
 * Places people from tallest to shortest (and, for equal heights, smallest
 * `k` first), inserting each at index `k`. Everyone already placed is at
 * least as tall, so the insertion position is exactly the count in front,
 * and shorter people placed later don't change taller people's counts.
 *
 * @see https://leetcode.com/problems/queue-reconstruction-by-height/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * queueReconstructionByHeight([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]);
 * // [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]
 */
export const queueReconstructionByHeight = (
	people: readonly (readonly number[])[],
): number[][] => {
	const queue: number[][] = [];
	const ordered = people.toSorted(
		([h1 = 0, k1 = 0], [h2 = 0, k2 = 0]) => h2 - h1 || k1 - k2,
	);
	for (const person of ordered) queue.splice(person[1] ?? 0, 0, [...person]);
	return queue;
};
