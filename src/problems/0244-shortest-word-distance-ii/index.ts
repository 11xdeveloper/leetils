/**
 * 244. Shortest Word Distance II
 *
 * Built from a list of words, answers many queries for the smallest distance
 * between the positions of two different words in it.
 *
 * Records every position of each word once, in increasing order. A query
 * then merges the two words' position lists with two pointers, always
 * advancing the smaller position, since moving the larger one away can only
 * increase the distance.
 *
 * @see https://leetcode.com/problems/shortest-word-distance-ii/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(a + b) per query where a and b are the two words' occurrence counts
 * @spaceComplexity O(n)
 *
 * @example
 * const distance = new ShortestWordDistanceII(["practice", "makes", "perfect", "coding", "makes"]);
 * distance.shortest("coding", "practice"); // 3
 * distance.shortest("makes", "coding"); // 1
 */
export class ShortestWordDistanceII {
	readonly #positions = new Map<string, number[]>();

	constructor(wordsDict: readonly string[]) {
		for (const [i, word] of wordsDict.entries()) {
			const positions = this.#positions.get(word);
			if (positions) positions.push(i);
			else this.#positions.set(word, [i]);
		}
	}

	shortest(word1: string, word2: string): number {
		const a = this.#positions.get(word1) ?? [];
		const b = this.#positions.get(word2) ?? [];
		let shortest = Number.POSITIVE_INFINITY;

		for (let i = 0, j = 0; i < a.length && j < b.length; ) {
			const x = a[i] ?? 0;
			const y = b[j] ?? 0;
			shortest = Math.min(shortest, Math.abs(x - y));
			if (x < y) i++;
			else j++;
		}

		return shortest;
	}
}
