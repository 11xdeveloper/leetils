/**
 * 925. Long Pressed Name
 *
 * Returns whether `typed` could be `name` typed with some keys held down
 * too long, producing extra copies of a character.
 *
 * Compares the two as runs of equal letters: the runs must match letter
 * for letter, each typed run at least as long as the name's.
 *
 * @see https://leetcode.com/problems/long-pressed-name/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * longPressedName("alex", "aaleex"); // true
 */
export const longPressedName = (name: string, typed: string): boolean => {
	const runs = (text: string): string[] => text.match(/(.)\1*/g) ?? [];
	const [expected, actual] = [runs(name), runs(typed)];
	return (
		expected.length === actual.length &&
		expected.every(
			(run, i) =>
				run.charAt(0) === actual[i]?.charAt(0) &&
				run.length <= (actual[i]?.length ?? 0),
		)
	);
};
