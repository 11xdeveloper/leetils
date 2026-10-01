/**
 * 1860. Incremental Memory Leak
 *
 * At second `i` a program takes `i` bits from whichever stick has more
 * free memory (the first on ties), crashing when neither has enough.
 * Returns `[crashTime, memory1Left, memory2Left]`.
 *
 * Simulates the seconds; there are only O(√(memory)) of them.
 *
 * @see https://leetcode.com/problems/incremental-memory-leak/
 * @difficulty Medium
 * @timeComplexity O(√(m1 + m2))
 * @spaceComplexity O(1)
 *
 * @example
 * incrementalMemoryLeak(8, 11); // [6, 0, 4]
 */
export const incrementalMemoryLeak = (
	memory1: number,
	memory2: number,
): number[] => {
	let [first, second, time] = [memory1, memory2, 1];
	for (; Math.max(first, second) >= time; time++) {
		if (first >= second) first -= time;
		else second -= time;
	}
	return [time, first, second];
};
