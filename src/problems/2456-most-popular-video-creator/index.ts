/**
 * 2456. Most Popular Video Creator
 *
 * A creator's popularity is the total views of their videos. Returns, for
 * every most popular creator, `[creator, id]` of their most viewed video
 * (smallest id on ties), in order of the creators' first appearance.
 *
 * Total each creator's views and track their best video.
 *
 * @see https://leetcode.com/problems/most-popular-video-creator/
 * @difficulty Medium
 * @timeComplexity O(n · L)
 * @spaceComplexity O(n)
 *
 * @example
 * mostPopularVideoCreator(["alice", "bob", "alice", "chris"], ["one", "two", "three", "four"], [5, 10, 5, 4]); // [["alice", "one"], ["bob", "two"]]
 */
export const mostPopularVideoCreator = (
	creators: readonly string[],
	ids: readonly string[],
	views: readonly number[],
): string[][] => {
	const stats = new Map<
		string,
		{ total: number; best: string; bestViews: number }
	>();
	for (const [i, creator] of creators.entries()) {
		const [id = "", count = 0] = [ids[i], views[i]];
		const entry = stats.get(creator);
		if (!entry) {
			stats.set(creator, { total: count, best: id, bestViews: count });
			continue;
		}
		entry.total += count;
		if (
			count > entry.bestViews ||
			(count === entry.bestViews && id < entry.best)
		)
			[entry.best, entry.bestViews] = [id, count];
	}
	const top = Math.max(...[...stats.values()].map(({ total }) => total));
	return [...stats]
		.filter(([, { total }]) => total === top)
		.map(([creator, { best }]) => [creator, best]);
};
