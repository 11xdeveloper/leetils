/**
 * 901. Online Stock Span
 *
 * Receives daily stock prices one at a time. For each, `next` returns its
 * span: how many consecutive days, ending today, had a price at most
 * today's.
 *
 * A stack of earlier prices with their spans, decreasing from bottom to
 * top. A new price absorbs the spans of every smaller-or-equal price on
 * top, since they can never end a span for a later day.
 *
 * @see https://leetcode.com/problems/online-stock-span/
 * @difficulty Medium
 * @timeComplexity O(1) amortised per price
 * @spaceComplexity O(n)
 *
 * @example
 * const spanner = new OnlineStockSpan();
 * [100, 80, 60, 70, 60, 75, 85].map((price) => spanner.next(price)); // [1, 1, 1, 2, 1, 4, 6]
 */
export class OnlineStockSpan {
	readonly #stack: [price: number, span: number][] = [];

	next(price: number): number {
		let span = 1;
		while (this.#stack.length > 0 && (this.#stack.at(-1)?.[0] ?? 0) <= price)
			span += this.#stack.pop()?.[1] ?? 0;
		this.#stack.push([price, span]);
		return span;
	}
}
