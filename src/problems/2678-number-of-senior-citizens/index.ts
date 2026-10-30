/**
 * 2678. Number of Senior Citizens
 *
 * Each passenger's details string holds their age in characters 11 and
 * 12. Returns how many passengers are over 60.
 *
 * Read each age.
 *
 * @see https://leetcode.com/problems/number-of-senior-citizens/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSeniorCitizens(["7868190130M7522", "5303914400F9211", "9273338290F4010"]); // 2
 */
export const numberOfSeniorCitizens = (details: readonly string[]): number =>
	details.filter((passenger) => Number(passenger.slice(11, 13)) > 60).length;
