const DAY = 24 * 60 * 60 * 1000;

/**
 * 2758. Next Day
 *
 * `Date.prototype.nextDay()`: the date of the following day, as
 * `"YYYY-MM-DD"`. Dates are read in UTC, matching how `new
 * Date("2014-06-20")` parses. Install it with `Date.prototype.nextDay =
 * nextDay`, or call it with `nextDay.call(date)`.
 *
 * Add a day's worth of milliseconds and format the result's UTC date.
 *
 * @see https://leetcode.com/problems/next-day/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * nextDay.call(new Date("2014-06-20")); // "2014-06-21"
 */
export function nextDay(this: Date): string {
	return new Date(this.getTime() + DAY).toISOString().slice(0, 10);
}
