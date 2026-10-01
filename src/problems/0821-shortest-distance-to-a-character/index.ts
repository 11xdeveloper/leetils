/**
 * 821. Shortest Distance to a Character
 *
 * For each index of `s`, returns the distance to the nearest occurrence of
 * the character `c`, which appears at least once.
 *
 * Two passes: left to right measuring from the last `c` seen, then right to
 * left keeping the smaller distance to the next `c`.
 *
 * @see https://leetcode.com/problems/shortest-distance-to-a-character/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * shortestDistanceToACharacter("loveleetcode", "e"); // [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]
 */
export const shortestDistanceToACharacter = (
	s: string,
	c: string,
): number[] => {
	const distances = new Array<number>(s.length).fill(Number.POSITIVE_INFINITY);
	for (let i = 0, last = Number.NEGATIVE_INFINITY; i < s.length; i++) {
		if (s.charAt(i) === c) last = i;
		distances[i] = i - last;
	}
	for (let i = s.length - 1, next = Number.POSITIVE_INFINITY; i >= 0; i--) {
		if (s.charAt(i) === c) next = i;
		distances[i] = Math.min(distances[i] ?? 0, next - i);
	}
	return distances;
};
