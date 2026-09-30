/**
 * 1024. Video Stitching
 *
 * Returns the fewest `clips` `[start, end]` needed to cover the event
 * `[0, time]`, or -1 if it can't be covered.
 *
 * Greedy, like jump game: for every position, the furthest end of a clip
 * starting there. Moving through the time line, a new clip is taken each
 * time the current coverage runs out, choosing the furthest reach seen.
 *
 * @see https://leetcode.com/problems/video-stitching/
 * @difficulty Medium
 * @timeComplexity O(n + time)
 * @spaceComplexity O(time)
 *
 * @example
 * videoStitching([[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], 10); // 3
 */
export const videoStitching = (
	clips: readonly (readonly number[])[],
	time: number,
): number => {
	const reach = new Array<number>(time).fill(0);
	for (const [start = 0, end = 0] of clips)
		if (start < time) reach[start] = Math.max(reach[start] ?? 0, end);

	let count = 0;
	let covered = 0;
	let furthest = 0;
	for (let t = 0; t < time; t++) {
		furthest = Math.max(furthest, reach[t] ?? 0);
		if (t === covered) {
			if (furthest <= t) return -1;
			count++;
			covered = furthest;
		}
	}
	return count;
};
