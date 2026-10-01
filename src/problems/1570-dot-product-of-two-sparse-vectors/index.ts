/**
 * 1570. Dot Product of Two Sparse Vectors
 *
 * Stores a mostly-zero vector compactly and computes `dotProduct` with
 * another such vector.
 *
 * Keeps only the non-zero entries, as sorted index and value lists, and
 * merges two of them in step.
 *
 * @see https://leetcode.com/problems/dot-product-of-two-sparse-vectors/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(a + b) per product for a and b non-zero entries
 * @spaceComplexity O(non-zero entries)
 *
 * @example
 * new DotProductOfTwoSparseVectors([1, 0, 0, 2, 3]).dotProduct(new DotProductOfTwoSparseVectors([0, 3, 0, 4, 0])); // 8
 */
export class DotProductOfTwoSparseVectors {
	readonly #indices: number[] = [];
	readonly #values: number[] = [];

	constructor(nums: readonly number[]) {
		nums.forEach((num, i) => {
			if (num === 0) return;
			this.#indices.push(i);
			this.#values.push(num);
		});
	}

	dotProduct(vec: DotProductOfTwoSparseVectors): number {
		let [i, j, total] = [0, 0, 0];
		while (i < this.#indices.length && j < vec.#indices.length) {
			const [a = 0, b = 0] = [this.#indices[i], vec.#indices[j]];
			if (a === b) {
				total += (this.#values[i] ?? 0) * (vec.#values[j] ?? 0);
				i++;
				j++;
			} else if (a < b) i++;
			else j++;
		}
		return total;
	}
}
