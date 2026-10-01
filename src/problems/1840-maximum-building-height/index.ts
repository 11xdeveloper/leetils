/**
 * 1840. Maximum Building Height
 *
 * Buildings `1 … n` start at height 0, neighbours differ by at most 1, and
 * `restrictions` cap some heights. Returns the tallest possible building.
 *
 * Sort the restrictions (with building 1 capped at 0), then tighten each
 * cap by its neighbours' caps plus the distance, forward and backward.
 * Between two adjacent caps the tallest point is where the two slopes
 * meet; after the last cap the height can keep rising.
 *
 * @see https://leetcode.com/problems/maximum-building-height/
 * @difficulty Hard
 * @timeComplexity O(r log r)
 * @spaceComplexity O(r)
 *
 * @example
 * maximumBuildingHeight(10, [[5, 3], [2, 5], [7, 4], [10, 3]]); // 5
 */
export const maximumBuildingHeight = (
	n: number,
	restrictions: readonly (readonly number[])[],
): number => {
	const caps = [
		[1, 0],
		...restrictions.map(([id = 0, height = 0]) => [id, height]),
	].sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const tighten = (from: number, to: number) => {
		const [cap, neighbour] = [caps[to], caps[from]];
		if (!cap || !neighbour) return;
		cap[1] = Math.min(
			cap[1] ?? 0,
			(neighbour[1] ?? 0) + Math.abs((cap[0] ?? 0) - (neighbour[0] ?? 0)),
		);
	};
	for (let i = 1; i < caps.length; i++) tighten(i - 1, i);
	for (let i = caps.length - 2; i >= 0; i--) tighten(i + 1, i);
	let best = 0;
	for (let i = 1; i < caps.length; i++) {
		const [
			[leftId = 0, leftHeight = 0] = [],
			[rightId = 0, rightHeight = 0] = [],
		] = [caps[i - 1], caps[i]];
		const gap = rightId - leftId;
		best = Math.max(best, Math.floor((leftHeight + rightHeight + gap) / 2));
	}
	const [lastId = 1, lastHeight = 0] = caps.at(-1) ?? [];
	return Math.max(best, lastHeight + n - lastId);
};
