/**
 * 943. Find the Shortest Superstring
 *
 * Returns a shortest string containing each of `words` (at most 12, none a
 * substring of another) as a substring. Any shortest answer is accepted.
 *
 * Joining words in some order, each pair overlaps as much as possible, so
 * it's a travelling-salesman problem on the overlaps. DP over (set of words
 * used, last word) finds the most total overlap, and the order is rebuilt
 * from the recorded choices.
 *
 * @see https://leetcode.com/problems/find-the-shortest-superstring/
 * @difficulty Hard
 * @timeComplexity O(2^n · n^2 + n^2 · L^2) for n words of length up to L
 * @spaceComplexity O(2^n · n)
 *
 * @example
 * findTheShortestSuperstring(["alex", "loves", "leetcode"]); // "alexlovesleetcode"
 */
export const findTheShortestSuperstring = (
	words: readonly string[],
): string => {
	const n = words.length;
	const overlap = words.map((a) =>
		words.map((b) => {
			for (let length = Math.min(a.length, b.length) - 1; length > 0; length--)
				if (a.endsWith(b.slice(0, length))) return length;
			return 0;
		}),
	);

	const full = (1 << n) - 1;
	// best[mask * n + last] is the most overlap for words in mask, ending with last.
	const best = new Int32Array((full + 1) * n).fill(-1);
	const previous = new Int32Array((full + 1) * n).fill(-1);
	for (let i = 0; i < n; i++) best[(1 << i) * n + i] = 0;
	for (let mask = 1; mask <= full; mask++) {
		for (let last = 0; last < n; last++) {
			const current = best[mask * n + last] ?? -1;
			if (current < 0) continue;
			for (let next = 0; next < n; next++) {
				if (mask & (1 << next)) continue;
				const state = (mask | (1 << next)) * n + next;
				const total = current + (overlap[last]?.[next] ?? 0);
				if (total > (best[state] ?? -1)) {
					best[state] = total;
					previous[state] = last;
				}
			}
		}
	}

	let last = 0;
	for (let i = 1; i < n; i++)
		if ((best[full * n + i] ?? -1) > (best[full * n + last] ?? -1)) last = i;
	const order: number[] = [];
	for (let mask = full; last >= 0; ) {
		order.push(last);
		const before = previous[mask * n + last] ?? -1;
		mask ^= 1 << last;
		last = before;
	}
	order.reverse();

	let result = words[order[0] ?? 0] ?? "";
	for (let i = 1; i < order.length; i++) {
		const [a = 0, b = 0] = [order[i - 1], order[i]];
		result += (words[b] ?? "").slice(overlap[a]?.[b] ?? 0);
	}
	return result;
};
