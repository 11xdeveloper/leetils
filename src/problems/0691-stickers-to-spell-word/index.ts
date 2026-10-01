/**
 * 691. Stickers to Spell Word
 *
 * Each sticker is a word whose letters can be cut out and rearranged, and
 * every sticker can be used any number of times. Returns the fewest
 * stickers needed to spell `target`, or -1 if it can't be done.
 *
 * Breadth-first search over which letters of `target` are covered, as a
 * bitmask. Each sticker covers as many uncovered letters as it can. Only
 * stickers containing the first uncovered letter are tried, since some
 * sticker must cover it and the order of stickers doesn't matter.
 *
 * @see https://leetcode.com/problems/stickers-to-spell-word/
 * @difficulty Hard
 * @timeComplexity O(2^t · s · (t + L)) for a target of length t and s stickers of length L
 * @spaceComplexity O(2^t)
 *
 * @example
 * stickersToSpellWord(["with", "example", "science"], "thehat"); // 3
 */
export const stickersToSpellWord = (
	stickers: readonly string[],
	target: string,
): number => {
	const full = (1 << target.length) - 1;
	const letterCounts = stickers.map((sticker) => {
		const counts = new Map<string, number>();
		for (const char of sticker) counts.set(char, (counts.get(char) ?? 0) + 1);
		return counts;
	});

	const steps = new Int32Array(full + 1).fill(-1);
	steps[0] = 0;
	const queue = [0];
	for (const covered of queue) {
		if (covered === full) return steps[covered] ?? -1;
		let first = 0;
		while (covered & (1 << first)) first++;

		for (const counts of letterCounts) {
			if (!counts.has(target.charAt(first))) continue;
			const available = new Map(counts);
			let next = covered;
			for (let i = 0; i < target.length; i++) {
				const char = target.charAt(i);
				if (next & (1 << i) || !available.get(char)) continue;
				available.set(char, (available.get(char) ?? 0) - 1);
				next |= 1 << i;
			}
			if (steps[next] === -1) {
				steps[next] = (steps[covered] ?? 0) + 1;
				queue.push(next);
			}
		}
	}

	return -1;
};
