import { Heap } from "../../internal/heap";

/**
 * 355. Design Twitter
 *
 * A simplified Twitter: users post tweets, follow and unfollow each other,
 * and read a news feed of the 10 most recent tweets from themselves and the
 * users they follow.
 *
 * Each tweet gets an increasing timestamp, and each user's tweets are kept
 * newest last. A feed merges the relevant users' tweet lists with a heap,
 * taking the newest remaining tweet each time, and stops after 10, so it
 * never looks at older tweets.
 *
 * @see https://leetcode.com/problems/design-twitter/
 * @difficulty Medium
 * @timeComplexity O(1) to post, follow or unfollow; O(f log f) for a feed, where f is the number of users followed
 * @spaceComplexity O(tweets + follows)
 *
 * @example
 * const twitter = new DesignTwitter();
 * twitter.postTweet(1, 5);
 * twitter.getNewsFeed(1); // [5]
 * twitter.follow(1, 2);
 * twitter.postTweet(2, 6);
 * twitter.getNewsFeed(1); // [6, 5]
 */
export class DesignTwitter {
	readonly #tweets = new Map<number, [time: number, tweetId: number][]>();
	readonly #following = new Map<number, Set<number>>();
	#time = 0;

	postTweet(userId: number, tweetId: number): void {
		const tweets = this.#tweets.get(userId);
		if (tweets) tweets.push([this.#time++, tweetId]);
		else this.#tweets.set(userId, [[this.#time++, tweetId]]);
	}

	/** The IDs of the 10 most recent tweets by the user or anyone they follow, newest first. */
	getNewsFeed(userId: number): number[] {
		const users = new Set([userId, ...(this.#following.get(userId) ?? [])]);
		// Each heap entry is a user's tweet list and the index of its newest unread tweet.
		const heap = new Heap<[tweets: [number, number][], index: number]>(
			([a, i], [b, j]) => (b[j]?.[0] ?? 0) - (a[i]?.[0] ?? 0),
		);
		for (const user of users) {
			const tweets = this.#tweets.get(user);
			if (tweets && tweets.length > 0) heap.push([tweets, tweets.length - 1]);
		}

		const feed: number[] = [];
		while (feed.length < 10 && heap.size > 0) {
			const [tweets, index] = heap.pop() ?? [[], 0];
			feed.push(tweets[index]?.[1] ?? 0);
			if (index > 0) heap.push([tweets, index - 1]);
		}
		return feed;
	}

	follow(followerId: number, followeeId: number): void {
		const following = this.#following.get(followerId);
		if (following) following.add(followeeId);
		else this.#following.set(followerId, new Set([followeeId]));
	}

	unfollow(followerId: number, followeeId: number): void {
		this.#following.get(followerId)?.delete(followeeId);
	}
}
