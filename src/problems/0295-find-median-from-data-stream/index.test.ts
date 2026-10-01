import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { FindMedianFromDataStream } from ".";

const median = (values: number[]): number => {
	const sorted = values.toSorted((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 1
		? (sorted[mid] ?? 0)
		: ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
};

describe("295. Find Median from Data Stream", () => {
	it("solves the example from the problem statement", () => {
		const finder = new FindMedianFromDataStream();
		finder.addNum(1);
		finder.addNum(2);
		expect(finder.findMedian()).toBe(1.5);
		finder.addNum(3);
		expect(finder.findMedian()).toBe(2);
	});

	it("matches sorting after every addition on random streams", () => {
		const random = createRandom(295);
		for (let run = 0; run < 100; run++) {
			const finder = new FindMedianFromDataStream();
			const values: number[] = [];
			for (let step = 0; step < 60; step++) {
				const num = random.int(-100_000, 100_000);
				finder.addNum(num);
				values.push(num);
				expect(finder.findMedian()).toBe(median(values));
			}
		}
	});
});
