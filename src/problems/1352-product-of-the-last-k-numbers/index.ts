/**
 * 1352. Product of the Last K Numbers
 *
 * A stream of numbers supporting `add(num)` and `getProduct(k)`, the
 * product of the last `k` numbers added.
 *
 * Keeps prefix products since the last 0; a 0 resets them. If `k` reaches
 * back past that 0 the product is 0, and otherwise it's a ratio of two
 * prefix products.
 *
 * @see https://leetcode.com/problems/product-of-the-last-k-numbers/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const stream = new ProductOfTheLastKNumbers();
 * for (const num of [3, 0, 2, 5, 4]) stream.add(num);
 * stream.getProduct(2); // 20
 * stream.getProduct(4); // 0
 */
export class ProductOfTheLastKNumbers {
	#prefix = [1];

	add(num: number): void {
		if (num === 0) this.#prefix = [1];
		else this.#prefix.push((this.#prefix.at(-1) ?? 1) * num);
	}

	getProduct(k: number): number {
		const prefix = this.#prefix;
		if (k >= prefix.length) return 0;
		return (prefix.at(-1) ?? 1) / (prefix[prefix.length - 1 - k] ?? 1);
	}
}
