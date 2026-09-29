/**
 * 636. Exclusive Time of Functions
 *
 * A single-threaded CPU runs `n` functions, logged as `"id:start:time"` and
 * `"id:end:time"`, where a start is at the beginning of `time` and an end at
 * its end. Returns each function's exclusive time: the units it spent
 * running itself, not functions it called.
 *
 * A stack of running functions. Between consecutive log entries, the
 * function on top of the stack gets the elapsed time. Ends are converted to
 * the start of the next unit so the arithmetic is uniform.
 *
 * @see https://leetcode.com/problems/exclusive-time-of-functions/
 * @difficulty Medium
 * @timeComplexity O(m) for m logs
 * @spaceComplexity O(m)
 *
 * @example
 * exclusiveTimeOfFunctions(2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]); // [3, 4]
 */
export const exclusiveTimeOfFunctions = (
	n: number,
	logs: readonly string[],
): number[] => {
	const times = new Array<number>(n).fill(0);
	const stack: number[] = [];
	let previous = 0;

	for (const log of logs) {
		const [idText = "0", kind, timeText = "0"] = log.split(":");
		const id = Number(idText);
		const time = kind === "start" ? Number(timeText) : Number(timeText) + 1;
		const running = stack.at(-1);
		if (running !== undefined)
			times[running] = (times[running] ?? 0) + time - previous;
		previous = time;
		if (kind === "start") stack.push(id);
		else stack.pop();
	}

	return times;
};
