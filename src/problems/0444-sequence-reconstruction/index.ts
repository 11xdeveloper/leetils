/**
 * 444. Sequence Reconstruction
 *
 * `nums` is a permutation of 1 to `n`, and every sequence in `sequences` is
 * a subsequence of it. Returns whether `nums` is the only shortest sequence
 * containing all of them as subsequences.
 *
 * Each sequence's neighbouring pairs say which number must come first. The
 * shortest supersequence is unique exactly when those rules fix a single
 * order, which Kahn's topological sort detects: at every step exactly one
 * number is free to go next. It must also be `nums`, which is guaranteed if
 * each consecutive pair of `nums` appears as a rule.
 *
 * @see https://leetcode.com/problems/sequence-reconstruction/
 * @difficulty Medium
 * @timeComplexity O(n + total length of the sequences)
 * @spaceComplexity O(n + total length of the sequences)
 *
 * @example
 * sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3], [2, 3]]); // true
 */
export const sequenceReconstruction = (
	nums: readonly number[],
	sequences: readonly (readonly number[])[],
): boolean => {
	const n = nums.length;
	const after: Set<number>[] = Array.from({ length: n + 1 }, () => new Set());
	const before = new Array<number>(n + 1).fill(0);
	for (const sequence of sequences) {
		for (let i = 1; i < sequence.length; i++) {
			const a = sequence[i - 1] ?? 0;
			const b = sequence[i] ?? 0;
			if (!after[a]?.has(b)) {
				after[a]?.add(b);
				before[b] = (before[b] ?? 0) + 1;
			}
		}
	}

	let ready = nums.filter((num) => before[num] === 0);
	for (const num of nums) {
		if (ready.length !== 1 || ready[0] !== num) return false;
		ready = [];
		for (const next of after[num] ?? []) {
			before[next] = (before[next] ?? 0) - 1;
			if (before[next] === 0) ready.push(next);
		}
	}

	return true;
};
