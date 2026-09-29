import { Heap } from "../../internal/heap";

/**
 * 358. Rearrange String k Distance Apart
 *
 * Rearranges `s` so equal letters are at least `k` positions apart, or
 * returns `""` if that's impossible. Any valid arrangement is accepted.
 *
 * Greedy: always place the most frequent letter that's allowed. A max-heap
 * holds the letters available now; a placed letter waits in a queue for
 * `k - 1` more placements before returning to the heap. If the heap runs
 * out while letters are still waiting, no arrangement exists.
 *
 * @see https://leetcode.com/problems/rearrange-string-k-distance-apart/
 * @difficulty Hard
 * @timeComplexity O(n log 26), linear
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeStringKDistanceApart("aabbcc", 3); // "abcabc"
 */
export const rearrangeStringKDistanceApart = (s: string, k: number): string => {
	if (k <= 1) return s;

	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

	const available = new Heap<[char: string, count: number]>(
		([a, x], [b, y]) => y - x || (a < b ? -1 : 1),
		counts,
	);
	const waiting: [char: string, count: number][] = [];
	let result = "";

	while (result.length < s.length) {
		const next = available.pop();
		if (!next) return "";
		const [char, count] = next;
		result += char;
		waiting.push([char, count - 1]);
		if (waiting.length >= k) {
			const [ready, remaining] = waiting.shift() ?? ["", 0];
			if (remaining > 0) available.push([ready, remaining]);
		}
	}

	return result;
};
