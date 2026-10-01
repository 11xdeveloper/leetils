/**
 * 466. Count The Repetitions
 *
 * `[s, n]` means `s` repeated `n` times. Returns the largest `m` such that
 * `[s2, n2 · m]` can be obtained from `[s1, n1]` by deleting characters,
 * i.e. is a subsequence of it.
 *
 * Greedily matches `s2` against successive copies of `s1`, counting whole
 * copies of `s2` matched. After each copy of `s1`, the only state is how far
 * into `s2` the match has got. That can take only `|s2|` values, so it soon
 * repeats, and the copies of `s1` between the two occurrences add the same
 * number of `s2` copies every time round. Whole cycles are skipped and the
 * rest simulated.
 *
 * @see https://leetcode.com/problems/count-the-repetitions/
 * @difficulty Hard
 * @timeComplexity O(|s1| · |s2|)
 * @spaceComplexity O(|s2|)
 *
 * @example
 * countTheRepetitions("acb", 4, "ab", 2); // 2
 */
export const countTheRepetitions = (
	s1: string,
	n1: number,
	s2: string,
	n2: number,
): number => {
	// For each position in s2 at the start of a copy of s1: that copy's number and the s2 count before it.
	const seen = new Map<number, [block: number, count: number]>();
	let index = 0;
	let count = 0;

	for (let block = 0; block < n1; block++) {
		const previous = seen.get(index);
		if (previous) {
			const [cycleStart, countAtStart] = previous;
			const cycleLength = block - cycleStart;
			const cycles = Math.floor((n1 - block) / cycleLength);
			count += cycles * (count - countAtStart);
			block += cycles * cycleLength;
			seen.clear();
			if (block === n1) break;
		} else {
			seen.set(index, [block, count]);
		}

		for (const char of s1) {
			if (char !== s2.charAt(index)) continue;
			index++;
			if (index === s2.length) {
				index = 0;
				count++;
			}
		}
	}

	return Math.floor(count / n2);
};
