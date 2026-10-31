type Mutable = Record<PropertyKey, unknown>;

interface Draft {
	readonly base: object;
	/** A shallow copy of `base`, made on the first write to this level. */
	copy: Mutable | undefined;
	/** Drafts for the nested objects read through this one. */
	readonly children: Map<PropertyKey, Draft>;
	proxy: object;
}

const isObject = (value: unknown): value is object =>
	typeof value === "object" && value !== null;

const shallowCopy = (value: object): Mutable =>
	(Array.isArray(value) ? [...value] : { ...value }) as Mutable;

/**
 * 2691. Immutability Helper
 *
 * Wrap a JSON object so `produce(mutator)` returns a changed copy of it
 * without touching the original: `mutator` gets a proxy of the object to
 * change however it likes, and the result has those changes. Parts that
 * weren't changed are shared with the original rather than copied.
 *
 * Copy on write. Each object reached through the proxy gets a draft that
 * reads from the original until it's first written to, when it makes a
 * shallow copy to write to instead. Afterwards, rebuild only the levels
 * whose copies or descendants changed.
 *
 * @see https://leetcode.com/problems/immutability-helper/
 * @difficulty Hard
 * @timeComplexity O(a) per `produce` on top of the mutator, where a is the size of the levels it touches
 * @spaceComplexity O(a)
 *
 * @example
 * const helper = new ImmutabilityHelper({ val: 10 });
 * helper.produce((proxy) => {
 *   proxy.val += 1;
 * }); // { val: 11 }
 */
export class ImmutabilityHelper<T extends object> {
	readonly #object: T;

	constructor(obj: T) {
		this.#object = obj;
	}

	produce(mutator: (proxy: T) => void): T {
		const drafts = new WeakMap<object, Draft>();

		const createDraft = (base: object): Draft => {
			const draft: Draft = {
				base,
				copy: undefined,
				children: new Map(),
				proxy: base,
			};
			const current = (): object => draft.copy ?? base;
			const write = (): Mutable => {
				draft.copy ??= shallowCopy(base);
				return draft.copy;
			};
			draft.proxy = new Proxy(base, {
				get: (_, key) => {
					const child = draft.children.get(key);
					if (child) return child.proxy;
					const value: unknown = Reflect.get(current(), key);
					if (
						!isObject(value) ||
						drafts.has(value) ||
						!Object.hasOwn(current(), key)
					)
						return value;
					const created = createDraft(value);
					draft.children.set(key, created);
					return created.proxy;
				},
				set: (_, key, value) => {
					draft.children.delete(key);
					write()[key] = value;
					return true;
				},
				deleteProperty: (_, key) => {
					draft.children.delete(key);
					delete write()[key];
					return true;
				},
				has: (_, key) => Reflect.has(current(), key),
				ownKeys: () => Reflect.ownKeys(current()),
				getOwnPropertyDescriptor: (_, key) =>
					Reflect.getOwnPropertyDescriptor(current(), key),
			});
			drafts.set(draft.proxy, draft);
			return draft;
		};

		const finalize = (draft: Draft): object => {
			let result = draft.copy;
			if (result)
				for (const key of Reflect.ownKeys(result)) {
					const value = result[key];
					const assigned = isObject(value) ? drafts.get(value) : undefined;
					if (assigned) result[key] = finalize(assigned);
				}
			for (const [key, child] of draft.children) {
				const value = finalize(child);
				if (value === child.base) continue;
				result ??= shallowCopy(draft.base);
				result[key] = value;
			}
			return result ?? draft.base;
		};

		const root = createDraft(this.#object);
		mutator(root.proxy as T);
		return finalize(root) as T;
	}
}
