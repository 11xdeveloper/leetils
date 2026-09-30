/**
 * 1357. Apply Discount Every n Orders
 *
 * A cashier with `products` priced at `prices` bills customers with
 * `getBill(product, amount)`, taking `discount` percent off every `n`th
 * customer's bill.
 *
 * A map from product to price, and a count of customers served.
 *
 * @see https://leetcode.com/problems/apply-discount-every-n-orders/
 * @difficulty Medium
 * @timeComplexity O(p) to build, O(k) per bill of k products
 * @spaceComplexity O(p)
 *
 * @example
 * const cashier = new ApplyDiscountEveryNOrders(3, 50, [1, 2, 3], [100, 200, 300]);
 * cashier.getBill([1], [1]); // 100
 * cashier.getBill([2], [1]); // 200
 * cashier.getBill([3], [1]); // 150
 */
export class ApplyDiscountEveryNOrders {
	readonly #n: number;
	readonly #discount: number;
	readonly #prices: Map<number, number>;
	#customers = 0;

	constructor(
		n: number,
		discount: number,
		products: readonly number[],
		prices: readonly number[],
	) {
		this.#n = n;
		this.#discount = discount;
		this.#prices = new Map(products.map((id, i) => [id, prices[i] ?? 0]));
	}

	getBill(product: readonly number[], amount: readonly number[]): number {
		this.#customers++;
		const bill = product.reduce(
			(sum, id, i) => sum + (this.#prices.get(id) ?? 0) * (amount[i] ?? 0),
			0,
		);
		return this.#customers % this.#n === 0
			? (bill * (100 - this.#discount)) / 100
			: bill;
	}
}
