/**
 * 3403. Find the Lexicographically Largest String From the Box I
 *
 * Every way of splitting `word` into `numFriends` non-empty pieces puts
 * its pieces in a box. Returns the lexicographically largest string there.
 *
 * A piece starting at i can be up to n - numFriends + 1 long, and longer is
 * better, so the answer is the largest suffix of `word` cut to that
 * length. Find the largest suffix in linear time by comparing two
 * candidate starts and skipping past whichever loses.
 *
 * @see https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLexicographicallyLargestStringFromTheBoxI("dbca", 2); // "dbc"
 */
export const findTheLexicographicallyLargestStringFromTheBoxI = (
	word: string,
	numFriends: number,
): string => {
	if (numFriends === 1) return word;
	const n = word.length;
	let best = 0;
	for (let other = 1, offset = 0; other + offset < n; ) {
		const a = word.charCodeAt(best + offset);
		const b = word.charCodeAt(other + offset);
		if (a === b) offset++;
		else {
			if (a < b) best = Math.max(best + offset + 1, other++);
			else other += offset + 1;
			if (other <= best) other = best + 1;
			offset = 0;
		}
	}
	return word.slice(best, best + n - numFriends + 1);
};
