/**
 * 1452. People Whose List of Favorite Companies Is Not a Subset of Another List
 *
 * Returns, in order, the people whose favourite companies (distinct lists)
 * aren't all among another person's favourites.
 *
 * Turns each list into a set and checks every person against every other
 * with at least as many companies.
 *
 * @see https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list/
 * @difficulty Medium
 * @timeComplexity O(n^2 · m) for lists up to m long
 * @spaceComplexity O(n · m)
 *
 * @example
 * peopleWhoseListOfFavoriteCompaniesIsNotASubsetOfAnotherList([["leetcode", "google", "facebook"], ["leetcode", "amazon"], ["facebook", "google"]]); // [0, 1]
 */
export const peopleWhoseListOfFavoriteCompaniesIsNotASubsetOfAnotherList = (
	favoriteCompanies: readonly (readonly string[])[],
): number[] => {
	const sets = favoriteCompanies.map((list) => new Set(list));
	return favoriteCompanies.flatMap((list, i) => {
		const covered = sets.some(
			(other, j) =>
				j !== i &&
				other.size >= list.length &&
				list.every((company) => other.has(company)),
		);
		return covered ? [] : [i];
	});
};
