/**
 * 1105. Filling Bookcase Shelves
 *
 * `books[i] = [thickness, height]`. Books go onto shelves in order, each
 * shelf holding books of total thickness at most `shelfWidth`, and a
 * shelf is as tall as its tallest book. Returns the smallest total height.
 *
 * Dynamic programming: `best[i]` is the smallest height for the first `i`
 * books. The last shelf holds books `j … i − 1` for some `j`, found by
 * walking back from `i` while they fit.
 *
 * @see https://leetcode.com/problems/filling-bookcase-shelves/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * fillingBookcaseShelves([[1, 3], [2, 4], [3, 2]], 6); // 4
 */
export const fillingBookcaseShelves = (
	books: readonly (readonly number[])[],
	shelfWidth: number,
): number => {
	const best = new Array<number>(books.length + 1).fill(0);
	for (let i = 1; i <= books.length; i++) {
		let [width, height, shortest] = [0, 0, Infinity];
		for (let j = i - 1; j >= 0; j--) {
			const [thickness = 0, bookHeight = 0] = books[j] ?? [];
			width += thickness;
			if (width > shelfWidth) break;
			height = Math.max(height, bookHeight);
			shortest = Math.min(shortest, (best[j] ?? 0) + height);
		}
		best[i] = shortest;
	}
	return best[books.length] ?? 0;
};
