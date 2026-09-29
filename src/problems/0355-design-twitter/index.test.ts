import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignTwitter } from ".";

describe("355. Design Twitter", () => {
	it("solves the example from the problem statement", () => {
		const twitter = new DesignTwitter();
		twitter.postTweet(1, 5);
		expect(twitter.getNewsFeed(1)).toEqual([5]);
		twitter.follow(1, 2);
		twitter.postTweet(2, 6);
		expect(twitter.getNewsFeed(1)).toEqual([6, 5]);
		twitter.unfollow(1, 2);
		expect(twitter.getNewsFeed(1)).toEqual([5]);
	});

	it("doesn't duplicate a user's own tweets when they follow themselves", () => {
		const twitter = new DesignTwitter();
		twitter.postTweet(1, 1);
		twitter.follow(1, 1);
		expect(twitter.getNewsFeed(1)).toEqual([1]);
		twitter.unfollow(1, 1);
		expect(twitter.getNewsFeed(1)).toEqual([1]);
	});

	it("matches filtering a list of every tweet on random operations", () => {
		const random = createRandom(355);
		for (let run = 0; run < 100; run++) {
			const twitter = new DesignTwitter();
			const allTweets: [user: number, id: number][] = [];
			const following = new Map<number, Set<number>>();
			let nextId = 0;
			for (let step = 0; step < 80; step++) {
				const [a, b] = [random.int(1, 4), random.int(1, 4)];
				const action = random.int(0, 3);
				if (action === 0) {
					twitter.postTweet(a, nextId);
					allTweets.push([a, nextId++]);
				} else if (action === 1) {
					twitter.follow(a, b);
					following.set(a, (following.get(a) ?? new Set()).add(b));
				} else if (action === 2) {
					twitter.unfollow(a, b);
					following.get(a)?.delete(b);
				} else {
					const visible = new Set([a, ...(following.get(a) ?? [])]);
					const expected = allTweets
						.filter(([user]) => visible.has(user))
						.map(([, id]) => id)
						.reverse()
						.slice(0, 10);
					expect(twitter.getNewsFeed(a)).toEqual(expected);
				}
			}
		}
	});
});
