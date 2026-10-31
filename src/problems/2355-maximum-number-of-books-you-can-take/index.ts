/**
 * 2355. Maximum Number of Books You Can Take
 *
 * From a contiguous range of shelves, takes at most `books[i]` from each,
 * strictly fewer from each shelf than from the next. Returns the most
 * books possible.
 *
 * `best[i]` takes all of shelf `i`, then one fewer per shelf leftwards
 * until a shelf caps the count: the last `j` with
 * `books[j] - j < books[i] - i`, found with a monotonic stack. From `j`
 * on, `best[j]` already fits.
 *
 * @see https://leetcode.com/problems/maximum-number-of-books-you-can-take/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfBooksYouCanTake([8, 5, 2, 7, 9]); // 19
 */
export const maximumNumberOfBooksYouCanTake = (
	books: readonly number[],
): number => {
	const best = new Array<number>(books.length).fill(0);
	const stack: number[] = [];
	let answer = 0;
	for (const [i, count] of books.entries()) {
		while (stack.length) {
			const top = stack.at(-1) ?? 0;
			if ((books[top] ?? 0) - top < count - i) break;
			stack.pop();
		}
		const j = stack.at(-1) ?? -1;
		const shelves = Math.min(i - j, count);
		let total = shelves * count - (shelves * (shelves - 1)) / 2;
		if (j >= 0 && i - j <= count) total += best[j] ?? 0;
		best[i] = total;
		answer = Math.max(answer, total);
		stack.push(i);
	}
	return answer;
};
