import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { debounce } from ".";

describe("2627. Debounce", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	/** Steps a fake clock one millisecond at a time, making each call on time. */
	const run = (t: number, calls: [time: number, input: number][]) => {
		const log: [number, number][] = [];
		let now = 0;
		const debounced = debounce((x: number) => log.push([now, x]), t);
		for (; now <= 1000; now++) {
			if (now > 0) jest.advanceTimersByTime(1);
			for (const [time, input] of calls) if (time === now) debounced(input);
		}
		return log;
	};

	it("solves the examples from the problem statement", () => {
		expect(
			run(50, [
				[50, 1],
				[75, 2],
			]),
		).toEqual([[125, 2]]);
		expect(
			run(20, [
				[50, 1],
				[100, 2],
			]),
		).toEqual([
			[70, 1],
			[120, 2],
		]);
		expect(
			run(150, [
				[50, 1],
				[300, 2],
				[300, 3],
			]),
		).toEqual([
			[200, 1],
			[450, 3],
		]);
	});
});
