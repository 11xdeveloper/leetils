/**
 * 319. Bulb Switcher
 *
 * `n` bulbs start off. In round `i`, every `i`th bulb is toggled, for rounds
 * 1 to `n`. Returns how many bulbs are on at the end.
 *
 * Bulb `k` is toggled once per divisor of `k`. Divisors come in pairs
 * except for a square's root, so only squares are toggled an odd number of
 * times and end up on. That's the number of squares up to `n`.
 *
 * @see https://leetcode.com/problems/bulb-switcher/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * bulbSwitcher(3); // 1
 */
export const bulbSwitcher = (n: number): number => Math.floor(Math.sqrt(n));
