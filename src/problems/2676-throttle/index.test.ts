import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { throttle } from ".";

describe("2676. Throttle", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	/** Steps a fake clock one millisecond at a time, making each call on time. */
	const run = (t: number, calls: [time: number, input: number][]) => {
		const log: [number, number][] = [];
		let now = 0;
		const throttled = throttle((x: number) => log.push([now, x]), t);
		for (; now <= 1000; now++) {
			if (now > 0) jest.advanceTimersByTime(1);
			for (const [time, input] of calls) if (time === now) throttled(input);
		}
		return log;
	};

	it("solves the examples from the problem statement", () => {
		expect(run(100, [[20, 1]])).toEqual([[20, 1]]);
		expect(
			run(50, [
				[50, 1],
				[50, 2],
				[50, 3],
			]),
		).toEqual([
			[50, 1],
			[100, 3],
		]);
		expect(
			run(70, [
				[50, 1],
				[50, 2],
				[75, 3],
				[100, 4],
				[140, 5],
			]),
		).toEqual([
			[50, 1],
			[120, 4],
			[190, 5],
		]);
	});

	it("runs at once again after a quiet cooldown", () => {
		expect(
			run(30, [
				[0, 1],
				[100, 2],
			]),
		).toEqual([
			[0, 1],
			[100, 2],
		]);
	});
});
