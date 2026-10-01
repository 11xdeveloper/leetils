/**
 * 158. Read N Characters Given read4 II - Call Multiple Times
 *
 * Given `read4`, which reads up to 4 characters from a file into `buf4` and
 * returns how many it read, returns a `read(buf, n)` function that reads up
 * to `n` characters into `buf` and returns how many it read. Unlike Read N
 * Characters Given Read4, `read` can be called many times, each call
 * continuing where the last one stopped.
 *
 * `read4` can read past where a call to `read` stops, so the characters it
 * read but `read` didn't use are kept for the next call.
 *
 * @see https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times/
 * @difficulty Hard
 * @timeComplexity O(n) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const read = readNCharactersGivenRead4IICallMultipleTimes(read4);
 * const buf: string[] = [];
 * read(buf, 1); // 1 for the file "abc": "a"
 * read(buf, 2); // 2: "bc"
 * read(buf, 1); // 0
 */
export const readNCharactersGivenRead4IICallMultipleTimes = (
	read4: (buf4: string[]) => number,
): ((buf: string[], n: number) => number) => {
	const buf4 = new Array<string>(4).fill("");
	let next = 0;
	let count = 0;

	return (buf, n) => {
		let total = 0;

		while (total < n) {
			if (next === count) {
				count = read4(buf4);
				next = 0;
				if (count === 0) break;
			}
			buf[total++] = buf4[next++] ?? "";
		}

		return total;
	};
};
