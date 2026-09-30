const CHUNK_SECONDS: Record<string, number> = {
	minute: 60,
	hour: 3600,
	day: 86400,
};

/**
 * 1348. Tweet Counts Per Frequency
 *
 * Records tweets by name and time, and counts a name's tweets in each
 * minute-, hour- or day-long chunk of a period `[startTime, endTime]` (the
 * last chunk may be shorter).
 *
 * Keeps each name's times sorted, inserting with a binary search. A query
 * walks the tweets inside the period once, dropping each into its chunk.
 *
 * @see https://leetcode.com/problems/tweet-counts-per-frequency/
 * @difficulty Medium
 * @timeComplexity O(t) per record for t tweets with that name, O(log t + k + c) per query for k tweets and c chunks
 * @spaceComplexity O(total tweets)
 *
 * @example
 * const tweets = new TweetCountsPerFrequency();
 * tweets.recordTweet("tweet3", 0);
 * tweets.recordTweet("tweet3", 60);
 * tweets.getTweetCountsPerFrequency("minute", "tweet3", 0, 60); // [1, 1]
 */
export class TweetCountsPerFrequency {
	readonly #times = new Map<string, number[]>();

	recordTweet(tweetName: string, time: number): void {
		const times = this.#times.get(tweetName) ?? [];
		this.#times.set(tweetName, times);
		times.splice(lowerBound(times, time), 0, time);
	}

	getTweetCountsPerFrequency(
		freq: string,
		tweetName: string,
		startTime: number,
		endTime: number,
	): number[] {
		const size = CHUNK_SECONDS[freq] ?? 60;
		const counts = new Array<number>(
			Math.floor((endTime - startTime) / size) + 1,
		).fill(0);
		const times = this.#times.get(tweetName) ?? [];
		for (let i = lowerBound(times, startTime); i < times.length; i++) {
			const time = times[i] ?? 0;
			if (time > endTime) break;
			const chunk = Math.floor((time - startTime) / size);
			counts[chunk] = (counts[chunk] ?? 0) + 1;
		}
		return counts;
	}
}

/** The index of the first element of the sorted `list` that is at least `value`. */
const lowerBound = (list: readonly number[], value: number): number => {
	let [low, high] = [0, list.length];
	while (low < high) {
		const mid = (low + high) >>> 1;
		if ((list[mid] ?? 0) < value) low = mid + 1;
		else high = mid;
	}
	return low;
};
