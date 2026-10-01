/**
 * 1820. Maximum Number of Accepted Invitations
 *
 * Boy `i` may invite girl `j` when `grid[i][j]` is 1; each accepts at most
 * one invitation. Returns the most accepted invitations.
 *
 * Maximum bipartite matching by augmenting paths: for each boy, a
 * breadth-first search over alternating paths finds a free girl, then the
 * path is flipped.
 *
 * @see https://leetcode.com/problems/maximum-number-of-accepted-invitations/
 * @difficulty Medium
 * @timeComplexity O(m · m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * maximumNumberOfAcceptedInvitations([[1, 1, 1], [1, 0, 1], [0, 0, 1]]); // 3
 */
export const maximumNumberOfAcceptedInvitations = (
	grid: readonly (readonly number[])[],
): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const boyOf = new Array<number>(n).fill(-1);
	const girlOf = new Array<number>(m).fill(-1);
	let matched = 0;
	for (let start = 0; start < m; start++) {
		// cameFrom[girl] is the boy who reached her in this search.
		const cameFrom = new Array<number>(n).fill(-1);
		const queue = [start];
		let free = -1;
		for (let head = 0; head < queue.length && free === -1; head++) {
			const boy = queue[head] ?? 0;
			for (let girl = 0; girl < n; girl++) {
				if (grid[boy]?.[girl] !== 1 || cameFrom[girl] !== -1) continue;
				cameFrom[girl] = boy;
				const partner = boyOf[girl] ?? -1;
				if (partner === -1) {
					free = girl;
					break;
				}
				queue.push(partner);
			}
		}
		if (free === -1) continue;
		matched++;
		for (let girl = free; girl !== -1; ) {
			const boy = cameFrom[girl] ?? 0;
			const previous = girlOf[boy] ?? -1;
			boyOf[girl] = boy;
			girlOf[boy] = girl;
			girl = previous;
		}
	}
	return matched;
};
