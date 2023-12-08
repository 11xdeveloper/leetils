import { test, expect } from 'bun:test';
import mergeLists from '.';
import { ListNode } from '../../utils';

test('mergeLists: .', () => {
    expect(
        mergeLists([
            ListNode.from([1, 4, 5]),
            ListNode.from([1, 3, 4]),
            ListNode.from([2, 6])
        ])?.sort()
    ).toStrictEqual(ListNode.from([1, 1, 2, 3, 4, 4, 5, 6]));
    expect(mergeLists([])).toBe(null);
});
