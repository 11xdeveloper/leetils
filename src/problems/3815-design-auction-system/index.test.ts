import { describe, expect, it } from "bun:test";
import { DesignAuctionSystem } from ".";

describe("3815. Design Auction System", () => {
	it("solves the examples from the problem statement", () => {
		const auction = new DesignAuctionSystem();
		auction.addBid(1, 7, 5);
		auction.addBid(2, 7, 6);
		expect(auction.getHighestBidder(7)).toBe(2);
		auction.updateBid(1, 7, 8);
		expect(auction.getHighestBidder(7)).toBe(1);
		auction.removeBid(2, 7);
		expect(auction.getHighestBidder(7)).toBe(1);
		expect(auction.getHighestBidder(3)).toBe(-1);
	});

	it("breaks ties by the larger user id and forgets removed bids", () => {
		const auction = new DesignAuctionSystem();
		auction.addBid(1, 1, 10);
		auction.addBid(3, 1, 10);
		expect(auction.getHighestBidder(1)).toBe(3);
		auction.removeBid(3, 1);
		expect(auction.getHighestBidder(1)).toBe(1);
		auction.removeBid(1, 1);
		expect(auction.getHighestBidder(1)).toBe(-1);
		auction.addBid(3, 1, 10);
		expect(auction.getHighestBidder(1)).toBe(3);
	});
});
