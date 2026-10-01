/**
 * 157. Read N Characters Given Read4
 *
 * Given `read4`, which reads up to 4 characters from a file into `buf4` and
 * returns how many it read, returns a `read(buf, n)` function that reads up
 * to `n` characters into `buf` and returns how many it read. As in
 * LeetCode's JavaScript version, `read` is built from `read4`, and is called
 * once per file.
 *
 * Calls `read4` until `n` characters have been copied or the file runs out,
 * copying only as many of the last batch as are still needed.
 *
 * @see https://leetcode.com/problems/read-n-characters-given-read4/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const read = readNCharactersGivenRead4(read4);
 * const buf: string[] = [];
 * read(buf, 4); // 3 for the file "abc", and buf starts ["a", "b", "c"]
 */
export const readNCharactersGivenRead4 =
	(read4: (buf4: string[]) => number): ((buf: string[], n: number) => number) =>
	(buf, n) => {
		const buf4 = new Array<string>(4).fill("");
		let total = 0;

		while (total < n) {
			const count = read4(buf4);
			if (count === 0) break;
			for (let i = 0; i < count && total < n; i++) buf[total++] = buf4[i] ?? "";
		}

		return total;
	};
