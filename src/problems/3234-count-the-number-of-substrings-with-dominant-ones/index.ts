/**
 * 3234. Count the Number of Substrings With Dominant Ones
 *
 * Count the substrings of the binary string `s` with at least as many ones
 * as the square of their number of zeros.
 *
 * A dominant substring with z zeros has length at least z² + z, so z is at
 * most about √n. From each start, step through the next few zeros: with
 * exactly z zeros the end lies between the z-th and (z + 1)-th zero, and
 * counts once the substring is long enough.
 *
 * @see https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones/
 * @difficulty Medium
 * @timeComplexity O(n √n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfSubstringsWithDominantOnes("00011"); // 5
 */
export const countTheNumberOfSubstringsWithDominantOnes = (
	s: string,
): number => {
	const n = s.length;
	const zeros: number[] = [];
	for (let i = 0; i < n; i++) if (s[i] === "0") zeros.push(i);
	zeros.push(n);
	let total = 0;
	let next = 0;
	for (let start = 0; start < n; start++) {
		while ((zeros[next] ?? n) < start) next++;
		for (let z = 0; next + z < zeros.length; z++) {
			const earliestEnd = Math.max(
				z === 0 ? start : (zeros[next + z - 1] ?? n),
				start + z * z + z - 1,
			);
			const latestEnd = (zeros[next + z] ?? n) - 1;
			if (z * z + z > n) break;
			if (latestEnd >= earliestEnd) total += latestEnd - earliestEnd + 1;
		}
	}
	return total;
};
