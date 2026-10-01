import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { TweetCountsPerFrequency as TweetCounts } from ".";

describe("1348. Tweet Counts Per Frequency", () => {
	it("solves the example from the problem statement", () => {
		const tweets = new TweetCounts();
		tweets.recordTweet("tweet3", 0);
		tweets.recordTweet("tweet3", 60);
		tweets.recordTweet("tweet3", 10);
		expect(
			tweets.getTweetCountsPerFrequency("minute", "tweet3", 0, 59),
		).toEqual([2]);
		expect(
			tweets.getTweetCountsPerFrequency("minute", "tweet3", 0, 60),
		).toEqual([2, 1]);
		tweets.recordTweet("tweet3", 120);
		expect(tweets.getTweetCountsPerFrequency("hour", "tweet3", 0, 210)).toEqual(
			[4],
		);
	});

	it("counts repeated times and unknown names", () => {
		const tweets = new TweetCounts();
		tweets.recordTweet("a", 5);
		tweets.recordTweet("a", 5);
		expect(tweets.getTweetCountsPerFrequency("day", "a", 0, 10)).toEqual([2]);
		expect(tweets.getTweetCountsPerFrequency("minute", "b", 0, 119)).toEqual([
			0, 0,
		]);
	});

	it("matches filtering every tweet on random operations", () => {
		const random = createRandom(1348);
		const sizes = { minute: 60, hour: 3600, day: 86400 } as const;
		for (let run = 0; run < 50; run++) {
			const tweets = new TweetCounts();
			const recorded: [string, number][] = [];
			for (let op = 0; op < 60; op++) {
				const name = random.string(1, "xy");
				if (random.next() < 0.6) {
					const time = random.int(0, 20000);
					tweets.recordTweet(name, time);
					recorded.push([name, time]);
					continue;
				}
				const freq =
					(["minute", "hour", "day"] as const)[random.int(0, 2)] ?? "minute";
				const start = random.int(0, 15000);
				const end = start + random.int(0, 10000);
				const size = sizes[freq];
				const expected = new Array<number>(
					Math.floor((end - start) / size) + 1,
				).fill(0);
				for (const [n, t] of recorded) {
					if (n !== name || t < start || t > end) continue;
					const chunk = Math.floor((t - start) / size);
					expected[chunk] = (expected[chunk] ?? 0) + 1;
				}
				expect(
					tweets.getTweetCountsPerFrequency(freq, name, start, end),
				).toEqual(expected);
			}
		}
	});
});
