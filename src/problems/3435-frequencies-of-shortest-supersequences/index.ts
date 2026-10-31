/**
 * 3435. Frequencies of Shortest Supersequences
 *
 * For two-letter words using at most 16 distinct letters, return the letter
 * frequencies (26 counts) of every shortest common supersequence, one per
 * distinct set of counts.
 *
 * Each letter appears once or twice. A letter used twice can go at both
 * ends, satisfying every word with it; the rest must be ordered to respect
 * the words between them, so their graph must have no cycle (a word "aa"
 * forces a double). Try every set of doubled letters, smallest first, and
 * keep all the smallest that leave the rest acyclic.
 *
 * @see https://leetcode.com/problems/frequencies-of-shortest-supersequences/
 * @difficulty Hard
 * @timeComplexity O(2^L · (L + w)), for L distinct letters and w words
 * @spaceComplexity O(L + w)
 *
 * @example
 * frequenciesOfShortestSupersequences(["ab", "ba"]); // two arrays, doubling a or b
 */
export const frequenciesOfShortestSupersequences = (
	words: readonly string[],
): number[][] => {
	const letters = [...new Set(words.join(""))].sort();
	const index = new Map(letters.map((letter, i) => [letter, i]));
	const L = letters.length;
	const edges = words.map(
		(word) =>
			[index.get(word.charAt(0)) ?? 0, index.get(word.charAt(1)) ?? 0] as const,
	);
	const acyclic = (doubled: number): boolean => {
		const indegree = new Int32Array(L);
		const out: number[][] = Array.from({ length: L }, () => []);
		for (const [a, b] of edges) {
			if ((doubled >> a) & 1 || (doubled >> b) & 1) continue;
			if (a === b) return false;
			out[a]?.push(b);
			indegree[b] = (indegree[b] ?? 0) + 1;
		}
		const queue: number[] = [];
		for (let v = 0; v < L; v++)
			if (!((doubled >> v) & 1) && indegree[v] === 0) queue.push(v);
		let seen = 0;
		for (let i = 0; i < queue.length; i++) {
			seen++;
			for (const next of out[queue[i] ?? 0] ?? []) {
				indegree[next] = (indegree[next] ?? 0) - 1;
				if (indegree[next] === 0) queue.push(next);
			}
		}
		let singles = 0;
		for (let v = 0; v < L; v++) if (!((doubled >> v) & 1)) singles++;
		return seen === singles;
	};
	const bits = (mask: number): number => {
		let count = 0;
		for (let m = mask; m; m &= m - 1) count++;
		return count;
	};
	let fewest = Number.POSITIVE_INFINITY;
	const answers: number[][] = [];
	for (let doubled = 0; doubled < 1 << L; doubled++) {
		const size = bits(doubled);
		if (size > fewest || !acyclic(doubled)) continue;
		if (size < fewest) {
			fewest = size;
			answers.length = 0;
		}
		const freq = new Array<number>(26).fill(0);
		letters.forEach((letter, i) => {
			freq[letter.charCodeAt(0) - 97] = (doubled >> i) & 1 ? 2 : 1;
		});
		answers.push(freq);
	}
	return answers;
};
