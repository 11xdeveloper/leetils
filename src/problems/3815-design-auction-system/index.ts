import { Heap } from "../../internal/heap";

/**
 * 3815. Design Auction System
 *
 * Track bids by users on items, supporting adding, updating and removing
 * bids, and finding an item's highest bidder (the highest user id on
 * ties), or -1.
 *
 * Keep each item's current bids in a map and a max-heap of (amount, user)
 * entries; entries that no longer match the map are stale and skipped
 * when they reach the top.
 *
 * @see https://leetcode.com/problems/design-auction-system/
 * @difficulty Medium
 * @timeComplexity O(log n) per operation, amortised
 * @spaceComplexity O(n)
 *
 * @example
 * const auction = new DesignAuctionSystem();
 * auction.addBid(1, 7, 5);
 * auction.addBid(2, 7, 6);
 * auction.getHighestBidder(7); // 2
 * auction.updateBid(1, 7, 8);
 * auction.getHighestBidder(7); // 1
 */
export class DesignAuctionSystem {
	readonly #bids = new Map<number, Map<number, number>>();
	readonly #heaps = new Map<number, Heap<[amount: number, userId: number]>>();

	addBid(userId: number, itemId: number, bidAmount: number): void {
		const bids = this.#bids.get(itemId) ?? new Map<number, number>();
		bids.set(userId, bidAmount);
		this.#bids.set(itemId, bids);
		const heap =
			this.#heaps.get(itemId) ??
			new Heap<[number, number]>((a, b) => b[0] - a[0] || b[1] - a[1]);
		heap.push([bidAmount, userId]);
		this.#heaps.set(itemId, heap);
	}

	updateBid(userId: number, itemId: number, newAmount: number): void {
		this.addBid(userId, itemId, newAmount);
	}

	removeBid(userId: number, itemId: number): void {
		this.#bids.get(itemId)?.delete(userId);
	}

	getHighestBidder(itemId: number): number {
		const heap = this.#heaps.get(itemId);
		const bids = this.#bids.get(itemId);
		if (!heap || !bids) return -1;
		for (
			let top = heap.peek();
			top && bids.get(top[1]) !== top[0];
			top = heap.peek()
		)
			heap.pop();
		return heap.peek()?.[1] ?? -1;
	}
}
