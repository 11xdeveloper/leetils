/**
 * 1306. Jump Game III
 *
 * From index `i` of `arr` you can jump to `i + arr[i]` or `i − arr[i]`,
 * staying inside the array. Returns whether some index holding 0 can be
 * reached from `start`.
 *
 * Breadth-first search over indices.
 *
 * @see https://leetcode.com/problems/jump-game-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameIII([4, 2, 3, 0, 3, 1, 2], 5); // true
 */
export const jumpGameIII = (arr: readonly number[], start: number): boolean => {
	const seen = new Uint8Array(arr.length);
	seen[start] = 1;
	const queue = [start];
	for (let i = 0; i < queue.length; i++) {
		const at = queue[i] ?? 0;
		const jump = arr[at] ?? 0;
		if (jump === 0) return true;
		for (const next of [at + jump, at - jump]) {
			if (next < 0 || next >= arr.length || seen[next]) continue;
			seen[next] = 1;
			queue.push(next);
		}
	}
	return false;
};
