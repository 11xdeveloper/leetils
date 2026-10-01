/** The interface LeetCode provides for querying the hidden array. */
interface ArrayReader {
	query(a: number, b: number, c: number, d: number): number;
	length(): number;
}

/**
 * 1538. Guess the Majority in a Hidden Array
 *
 * The hidden array holds 0s and 1s. `reader.query(a, b, c, d)` says whether
 * four elements are split 4–0, 3–1 or 2–2. Within `2n` queries, returns an
 * index of the more common value, or -1 on a tie.
 *
 * A query's answer depends only on the parity of the number of 1s among the
 * four, so swapping one element for another leaves the answer the same
 * exactly when the two elements are equal. That compares every element
 * with element 0 in about `n` queries.
 *
 * @see https://leetcode.com/problems/guess-the-majority-in-a-hidden-array/
 * @difficulty Medium
 * @timeComplexity O(n) queries
 * @spaceComplexity O(1)
 *
 * @example
 * guessTheMajorityInAHiddenArray(reader); // an index holding the majority value
 */
export const guessTheMajorityInAHiddenArray = (reader: ArrayReader): number => {
	const n = reader.length();
	const base = reader.query(0, 1, 2, 3);
	const without0 = reader.query(1, 2, 3, 4);
	let [same, differentIndex, different] = [1, -1, 0];
	const record = (index: number, equal: boolean) => {
		if (equal) same++;
		else {
			different++;
			differentIndex = index;
		}
	};
	// Elements 1, 2 and 3 swap places with element 0 in a query that includes 4.
	record(1, reader.query(0, 2, 3, 4) === without0);
	record(2, reader.query(0, 1, 3, 4) === without0);
	record(3, reader.query(0, 1, 2, 4) === without0);
	// Every later element swaps places with element 0 in the first query.
	for (let i = 4; i < n; i++) record(i, reader.query(1, 2, 3, i) === base);
	if (same === different) return -1;
	return same > different ? 0 : differentIndex;
};
