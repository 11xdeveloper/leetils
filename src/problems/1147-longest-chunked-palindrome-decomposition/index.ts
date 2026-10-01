/**
 * 1147. Longest Chunked Palindrome Decomposition
 *
 * Splits `text` into the most non-empty chunks such that the chunk list
 * reads the same forwards and backwards. Returns how many chunks that is.
 *
 * Greedy from both ends: peel off the shortest matching prefix and suffix
 * as a pair of chunks, and repeat on the middle. Taking the shortest match
 * is never worse, since a longer match starts and ends with it. If nothing
 * matches, what's left is one chunk.
 *
 * @see https://leetcode.com/problems/longest-chunked-palindrome-decomposition/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * longestChunkedPalindromeDecomposition("ghiabcdefhelloadamhelloabcdefghi"); // 7
 */
export const longestChunkedPalindromeDecomposition = (text: string): number => {
	let [start, end, chunks] = [0, text.length, 0];
	while (start < end) {
		let matched = false;
		for (let length = 1; 2 * length <= end - start; length++) {
			if (text.slice(start, start + length) !== text.slice(end - length, end))
				continue;
			chunks += 2;
			start += length;
			end -= length;
			matched = true;
			break;
		}
		if (!matched) {
			chunks++;
			break;
		}
	}
	return chunks;
};
