/**
 * 1311. Get Watched Videos by Your Friends
 *
 * Returns the videos watched by the people exactly `level` friendships
 * away from person `id`, ordered by how many of them watched each (fewest
 * first), then alphabetically.
 *
 * Breadth-first search over friendships to that level, then counts the
 * videos watched by the people on it.
 *
 * @see https://leetcode.com/problems/get-watched-videos-by-your-friends/
 * @difficulty Medium
 * @timeComplexity O(n + f + v log v) for f friendships and v videos
 * @spaceComplexity O(n + v)
 *
 * @example
 * getWatchedVideosByYourFriends([["A", "B"], ["C"], ["B", "C"], ["D"]], [[1, 2], [0, 3], [0, 3], [1, 2]], 0, 1); // ["B", "C"]
 */
export const getWatchedVideosByYourFriends = (
	watchedVideos: readonly (readonly string[])[],
	friends: readonly (readonly number[])[],
	id: number,
	level: number,
): string[] => {
	const seen = new Set([id]);
	let people = [id];
	for (let depth = 0; depth < level; depth++) {
		const next: number[] = [];
		for (const person of people) {
			for (const friend of friends[person] ?? []) {
				if (seen.has(friend)) continue;
				seen.add(friend);
				next.push(friend);
			}
		}
		people = next;
	}
	const counts = new Map<string, number>();
	for (const person of people) {
		for (const video of watchedVideos[person] ?? []) {
			counts.set(video, (counts.get(video) ?? 0) + 1);
		}
	}
	return [...counts.keys()].sort(
		(a, b) =>
			(counts.get(a) ?? 0) - (counts.get(b) ?? 0) ||
			(a < b ? -1 : a > b ? 1 : 0),
	);
};
