/**
 * 920. Number of Music Playlists
 *
 * Counts the playlists of `goal` songs, drawn from `n` songs, that play
 * every song at least once and only replay a song after `k` other songs
 * have played since. Returns the count modulo 10^9 + 7.
 *
 * `ways[i][j]` counts playlists of length `i` using exactly `j` distinct
 * songs. The next song is either new (`n - j` choices) or a repeat of one
 * not among the last `k` played (`j - k` choices, if positive).
 *
 * @see https://leetcode.com/problems/number-of-music-playlists/
 * @difficulty Hard
 * @timeComplexity O(goal · n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfMusicPlaylists(3, 3, 1); // 6
 */
export const numberOfMusicPlaylists = (
	n: number,
	goal: number,
	k: number,
): number => {
	const MOD = 1_000_000_007;
	let ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	for (let length = 1; length <= goal; length++) {
		const next = new Array<number>(n + 1).fill(0);
		for (let distinct = 1; distinct <= n; distinct++) {
			const fresh = ((ways[distinct - 1] ?? 0) * (n - distinct + 1)) % MOD;
			const repeat = ((ways[distinct] ?? 0) * Math.max(distinct - k, 0)) % MOD;
			next[distinct] = (fresh + repeat) % MOD;
		}
		ways = next;
	}
	return ways[n] ?? 0;
};
