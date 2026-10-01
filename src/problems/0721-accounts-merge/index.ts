/**
 * 721. Accounts Merge
 *
 * Each account is a name followed by email addresses. Accounts sharing an
 * email belong to the same person (people with the same name may still be
 * different). Returns the merged accounts, each as the name followed by its
 * emails in sorted order; the accounts themselves may be in any order.
 *
 * Union–find over emails: every account links its emails together. Each
 * group of emails is then one person, named by any of their accounts.
 *
 * @see https://leetcode.com/problems/accounts-merge/
 * @difficulty Medium
 * @timeComplexity O(E log E) for E emails, for the sorting
 * @spaceComplexity O(E)
 *
 * @example
 * accountsMerge([["John", "a@x.com", "b@x.com"], ["John", "b@x.com", "c@x.com"]]); // [["John", "a@x.com", "b@x.com", "c@x.com"]]
 */
export const accountsMerge = (
	accounts: readonly (readonly string[])[],
): string[][] => {
	const parent = new Map<string, string>();
	const nameOf = new Map<string, string>();
	const find = (email: string): string => {
		let root = email;
		while (parent.get(root) !== root) root = parent.get(root) ?? root;
		for (let node = email; node !== root; ) {
			const next = parent.get(node) ?? root;
			parent.set(node, root);
			node = next;
		}
		return root;
	};

	for (const [name = "", first, ...rest] of accounts) {
		if (first === undefined) continue;
		for (const email of [first, ...rest]) {
			if (!parent.has(email)) parent.set(email, email);
			nameOf.set(email, name);
			parent.set(find(email), find(first));
		}
	}

	const groups = new Map<string, string[]>();
	for (const email of parent.keys()) {
		const root = find(email);
		const group = groups.get(root);
		if (group) group.push(email);
		else groups.set(root, [email]);
	}

	return [...groups].map(([root, emails]) => [
		nameOf.get(root) ?? "",
		...emails.sort(),
	]);
};
