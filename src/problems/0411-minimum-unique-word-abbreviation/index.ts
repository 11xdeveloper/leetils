/**
 * 411. Minimum Unique Word Abbreviation
 *
 * Returns a shortest abbreviation of `target` that doesn't also abbreviate
 * any word in `dictionary`. An abbreviation's length counts each kept letter
 * and each replaced run of letters as one. Any shortest one is accepted.
 *
 * An abbreviation is a choice of which positions to keep. Only dictionary
 * words of the same length matter, and one of those matches an abbreviation
 * unless a kept position holds a different letter. So each such word gives
 * a bitmask of the positions where it differs from `target`, and a choice
 * of kept positions works when it overlaps every one of those masks. It
 * tries every choice, keeping the shortest that works.
 *
 * @see https://leetcode.com/problems/minimum-unique-word-abbreviation/
 * @difficulty Hard
 * @timeComplexity O(2^m · (n + m)) where m is the target's length
 * @spaceComplexity O(n)
 *
 * @example
 * minimumUniqueWordAbbreviation("apple", ["blade"]); // "a4"
 */
export const minimumUniqueWordAbbreviation = (
	target: string,
	dictionary: readonly string[],
): string => {
	const m = target.length;
	const differences = dictionary
		.filter((word) => word.length === m)
		.map((word) => {
			let mask = 0;
			for (let i = 0; i < m; i++) if (word[i] !== target[i]) mask |= 1 << i;
			return mask;
		});

	const abbreviationLength = (kept: number): number => {
		let length = 0;
		for (let i = 0; i < m; i++) {
			if (kept & (1 << i)) length++;
			else if (i === 0 || kept & (1 << (i - 1))) length++;
		}
		return length;
	};

	let bestMask = (1 << m) - 1;
	let bestLength = m;
	for (let kept = 0; kept < 1 << m; kept++) {
		const length = abbreviationLength(kept);
		if (
			length < bestLength &&
			differences.every((difference) => (difference & kept) !== 0)
		) {
			bestMask = kept;
			bestLength = length;
		}
	}

	let abbreviation = "";
	let run = 0;
	for (let i = 0; i < m; i++) {
		if (bestMask & (1 << i)) {
			if (run > 0) abbreviation += run;
			abbreviation += target.charAt(i);
			run = 0;
		} else {
			run++;
		}
	}
	return run > 0 ? abbreviation + run : abbreviation;
};
