import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { customInterval } from ".";

describe("2805. Custom Interval", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const run = (delay: number, period: number, stopTime: number) => {
		const log: number[] = [];
		let now = 0;
		const clear = customInterval(() => log.push(now), delay, period);
		setTimeout(clear, stopTime);
		for (now = 1; now <= 1000; now++) jest.advanceTimersByTime(1);
		return log;
	};

	it("solves the examples from the problem statement", () => {
		expect(run(50, 20, 225)).toEqual([50, 120, 210]);
		expect(run(20, 20, 150)).toEqual([20, 60, 120]);
	});
});
