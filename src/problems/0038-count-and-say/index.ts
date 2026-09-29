/**
 * 38. Count and Say
 *
 * Returns the `n`th term of the count-and-say sequence. The first term is
 * `"1"`, and each later term describes the previous one by run-length
 * encoding it: `"21"` is read as "one 2, one 1", giving `"1211"`.
 *
 * Builds each term from the previous one by counting runs of equal digits.
 *
 * @see https://leetcode.com/problems/count-and-say/
 * @difficulty Medium
 * @timeComplexity O(L) where L is the total length of the first n terms, which grows by about 30% per term
 * @spaceComplexity O(L_n) where L_n is the length of the nth term
 *
 * @example
 * countAndSay(4); // "1211"
 */
export const countAndSay = (n: number): string => {
	let term = "1";

	for (let i = 1; i < n; i++) {
		const parts: string[] = [];
		let runStart = 0;
		for (let j = 1; j <= term.length; j++) {
			if (term[j] !== term[runStart]) {
				parts.push(String(j - runStart), term.charAt(runStart));
				runStart = j;
			}
		}
		term = parts.join("");
	}

	return term;
};
