/** LeetCode's stream of bits. */
interface InfiniteStream {
	next(): number;
}

/**
 * 3023. Find Pattern in Infinite Stream I
 *
 * The first index at which the bit `pattern` occurs in an infinite stream
 * of bits, read one at a time with `stream.next()`. The pattern is known
 * to occur.
 *
 * Run KMP over the stream, so each bit is read once.
 *
 * @see https://leetcode.com/problems/find-pattern-in-infinite-stream-i/
 * @difficulty Medium
 * @timeComplexity O(m + i), for a pattern of length m found at index i
 * @spaceComplexity O(m)
 *
 * @example
 * const bits = [1, 1, 1, 0, 1];
 * let i = 0;
 * findPatternInInfiniteStreamI({ next: () => bits[i++ % 5] ?? 0 }, [0, 1]); // 3
 */
export const findPatternInInfiniteStreamI = (
	stream: InfiniteStream,
	pattern: readonly number[],
): number => {
	const m = pattern.length;
	const fail = new Int32Array(m);
	for (let i = 1, length = 0; i < m; i++) {
		while (length > 0 && pattern[i] !== pattern[length])
			length = fail[length - 1] ?? 0;
		if (pattern[i] === pattern[length]) length++;
		fail[i] = length;
	}
	for (let i = 0, matched = 0; ; i++) {
		const bit = stream.next();
		while (matched > 0 && bit !== pattern[matched])
			matched = fail[matched - 1] ?? 0;
		if (bit === pattern[matched]) matched++;
		if (matched === m) return i - m + 1;
	}
};
