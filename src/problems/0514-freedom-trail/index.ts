/**
 * 514. Freedom Trail
 *
 * The characters of `ring` are arranged around a dial, with `ring[0]` at
 * the 12 o'clock mark. Spelling `key` means rotating the dial one step at a
 * time until each character reaches the mark, then pressing a button (one
 * step each). Returns the fewest steps to spell the whole key.
 *
 * DP over the key: for each ring position holding the current key
 * character, the fewest steps to have spelled the key so far with the dial
 * there. Each comes from the best of the previous character's positions,
 * plus the shorter way round between them.
 *
 * @see https://leetcode.com/problems/freedom-trail/
 * @difficulty Hard
 * @timeComplexity O(k · r^2) for a key of length k and a ring of length r
 * @spaceComplexity O(r)
 *
 * @example
 * freedomTrail("godding", "gd"); // 4
 */
export const freedomTrail = (ring: string, key: string): number => {
	const n = ring.length;
	const positions = new Map<string, number[]>();
	for (const [i, char] of [...ring].entries()) {
		const list = positions.get(char);
		if (list) list.push(i);
		else positions.set(char, [i]);
	}

	let steps = new Map([[0, 0]]);
	for (const char of key) {
		const next = new Map<number, number>();
		for (const to of positions.get(char) ?? []) {
			let best = Number.POSITIVE_INFINITY;
			for (const [from, taken] of steps) {
				const distance = Math.abs(to - from);
				best = Math.min(best, taken + Math.min(distance, n - distance));
			}
			next.set(to, best + 1);
		}
		steps = next;
	}

	return Math.min(...steps.values());
};
