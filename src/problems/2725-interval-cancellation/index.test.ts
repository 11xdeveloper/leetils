import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { intervalCancellation } from ".";

describe("2725. Interval Cancellation", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const run = <A extends unknown[]>(
		fn: (...args: A) => unknown,
		args: A,
		t: number,
		cancelTimeMs: number,
	) => {
		const log: [number, unknown][] = [];
		let now = 0;
		const cancel = intervalCancellation(
			(...a: A) => log.push([now, fn(...a)]),
			args,
			t,
		);
		setTimeout(cancel, cancelTimeMs);
		for (now = 1; now <= 1000; now++) jest.advanceTimersByTime(1);
		return log;
	};

	it("solves the examples from the problem statement", () => {
		expect(run((x: number) => x * 2, [4], 35, 190)).toEqual([
			[0, 8],
			[35, 8],
			[70, 8],
			[105, 8],
			[140, 8],
			[175, 8],
		]);
		expect(run((x1: number, x2: number) => x1 * x2, [2, 5], 30, 165)).toEqual([
			[0, 10],
			[30, 10],
			[60, 10],
			[90, 10],
			[120, 10],
			[150, 10],
		]);
		expect(
			run(
				(x1: number, x2: number, x3: number) => x1 + x2 + x3,
				[5, 1, 3],
				50,
				180,
			),
		).toEqual([
			[0, 9],
			[50, 9],
			[100, 9],
			[150, 9],
		]);
	});
});
