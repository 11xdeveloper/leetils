import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { timeoutCancellation } from ".";

describe("2715. Timeout Cancellation", () => {
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
		const cancel = timeoutCancellation(
			(...a: A) => log.push([now, fn(...a)]),
			args,
			t,
		);
		setTimeout(cancel, cancelTimeMs);
		for (now = 1; now <= 1000; now++) jest.advanceTimersByTime(1);
		return log;
	};

	it("solves the examples from the problem statement", () => {
		expect(run((x: number) => x * 5, [2], 20, 50)).toEqual([[20, 10]]);
		expect(run((x: number) => x ** 2, [2], 100, 50)).toEqual([]);
		expect(run((x1: number, x2: number) => x1 * x2, [2, 4], 30, 100)).toEqual([
			[30, 8],
		]);
	});
});
