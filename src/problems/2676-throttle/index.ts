/**
 * 2676. Throttle
 *
 * Wrap `fn` so it runs at most once every `t` milliseconds. A call outside a
 * cooldown runs at once and starts one. Calls during a cooldown are held,
 * and when it ends the latest of them runs and starts the next cooldown.
 *
 * Keep the latest held arguments and a cooldown timer that runs them when it
 * fires.
 *
 * @see https://leetcode.com/problems/throttle/
 * @difficulty Medium
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const log = throttle(console.log, 100);
 * log("a"); // logged at once
 * log("b"); // logged 100ms later
 */
export function throttle<A extends unknown[]>(
	fn: (...args: A) => unknown,
	t: number,
): (...args: A) => void {
	let cooling = false;
	let held: A | undefined;
	const cooldown = (): void => {
		cooling = true;
		setTimeout(() => {
			cooling = false;
			if (held) {
				const args = held;
				held = undefined;
				fn(...args);
				cooldown();
			}
		}, t);
	};
	return (...args) => {
		if (cooling) held = args;
		else {
			fn(...args);
			cooldown();
		}
	};
}
