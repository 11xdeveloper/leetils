/**
 * 420. Strong Password Checker
 *
 * Returns the fewest steps (inserting, deleting or replacing one character)
 * to make `password` strong: 6 to 20 characters, with a lowercase letter, an
 * uppercase letter and a digit, and no three identical characters in a row.
 *
 * Counts the missing character types and the runs of three or more. Short
 * passwords need insertions, which can also fix types and runs. Passwords
 * up to 20 characters fix runs with replacements (one per 3 characters of
 * each run), which can also fix types. Long passwords must delete down to
 * 20, and deletions are spent first where they save a replacement: on runs
 * whose length is a multiple of 3, then one more than a multiple, then the
 * rest.
 *
 * @see https://leetcode.com/problems/strong-password-checker/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * strongPasswordChecker("aA1"); // 3
 * strongPasswordChecker("1337C0d3"); // 0
 */
export const strongPasswordChecker = (password: string): number => {
	const n = password.length;
	const missing =
		(/[a-z]/.test(password) ? 0 : 1) +
		(/[A-Z]/.test(password) ? 0 : 1) +
		(/\d/.test(password) ? 0 : 1);

	const runs: number[] = [];
	for (let i = 0; i < n; ) {
		let j = i;
		while (j < n && password[j] === password[i]) j++;
		if (j - i >= 3) runs.push(j - i);
		i = j;
	}

	if (n < 6) return Math.max(6 - n, missing);

	let replacements = runs.reduce((sum, run) => sum + Math.floor(run / 3), 0);
	if (n <= 20) return Math.max(missing, replacements);

	const deletions = n - 20;
	let remaining = deletions;
	// A deletion saves a replacement on a run of length 3k, two on 3k + 1, three on 3k + 2.
	for (let modulus = 0; modulus < 3; modulus++) {
		for (let i = 0; i < runs.length; i++) {
			const run = runs[i] ?? 0;
			if (run < 3 || run % 3 !== modulus) continue;
			const used = Math.min(remaining, modulus + 1);
			remaining -= used;
			runs[i] = run - used;
			if (used === modulus + 1) replacements--;
		}
	}
	// Any deletions left save one replacement per three characters removed.
	replacements -= Math.floor(remaining / 3);

	return deletions + Math.max(missing, Math.max(0, replacements));
};
