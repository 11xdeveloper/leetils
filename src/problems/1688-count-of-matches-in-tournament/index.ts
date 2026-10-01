/**
 * 1688. Count of Matches in Tournament
 *
 * Returns how many matches a knockout tournament of `n` teams plays (an
 * odd team out advances without playing).
 *
 * Every match eliminates exactly one team, and all but the winner are
 * eliminated.
 *
 * @see https://leetcode.com/problems/count-of-matches-in-tournament/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * countOfMatchesInTournament(7); // 6
 */
export const countOfMatchesInTournament = (n: number): number => n - 1;
