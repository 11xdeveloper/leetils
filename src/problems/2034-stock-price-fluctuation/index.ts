import { Heap } from "../../internal/heap";

/**
 * 2034. Stock Price Fluctuation
 *
 * Records stock prices by timestamp, where a later record for a timestamp
 * corrects the earlier one, and reports the latest, highest and lowest
 * prices.
 *
 * Keep the current price per timestamp, plus a max-heap and a min-heap of
 * every record. A heap's top is stale when its timestamp's price has since
 * changed; discard such tops lazily.
 *
 * @see https://leetcode.com/problems/stock-price-fluctuation/
 * @difficulty Medium
 * @timeComplexity O(log n) amortised per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const stock = new StockPriceFluctuation();
 * stock.update(1, 10);
 * stock.update(2, 5);
 * stock.current(); // 5
 * stock.maximum(); // 10
 */
export class StockPriceFluctuation {
	readonly #prices = new Map<number, number>();
	readonly #highest = new Heap<[price: number, timestamp: number]>(
		(a, b) => b[0] - a[0],
	);
	readonly #lowest = new Heap<[price: number, timestamp: number]>(
		(a, b) => a[0] - b[0],
	);
	#latest = 0;

	update(timestamp: number, price: number): void {
		this.#prices.set(timestamp, price);
		this.#latest = Math.max(this.#latest, timestamp);
		this.#highest.push([price, timestamp]);
		this.#lowest.push([price, timestamp]);
	}

	current(): number {
		return this.#prices.get(this.#latest) ?? 0;
	}

	maximum(): number {
		return this.#top(this.#highest);
	}

	minimum(): number {
		return this.#top(this.#lowest);
	}

	#top(heap: Heap<[price: number, timestamp: number]>): number {
		for (let top = heap.peek(); top; top = heap.peek()) {
			if (this.#prices.get(top[1]) === top[0]) return top[0];
			heap.pop();
		}
		return 0;
	}
}
