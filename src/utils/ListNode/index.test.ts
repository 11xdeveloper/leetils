import { test, expect } from 'bun:test';
import { ListNode } from '../../index';

test('ListNode.from: Converts an array of numbers into ListNodes', () => {
    expect(ListNode.from([1, 2, 4])).toStrictEqual(
        new ListNode(1, new ListNode(2, new ListNode(4)))
    );
    expect(ListNode.from([1, 3, 4])).toStrictEqual(
        new ListNode(1, new ListNode(3, new ListNode(4)))
    );
    expect(ListNode.from([1, 1, 2, 3, 4, 4])).toStrictEqual(
        new ListNode(
            1,
            new ListNode(
                1,
                new ListNode(
                    2,
                    new ListNode(3, new ListNode(4, new ListNode(4)))
                )
            )
        )
    );
});

test('ListNode.push: Adds a node at the end of the ListNode', () => {
    expect(ListNode.from([1, 2, 4]).push(5)).toStrictEqual(
        ListNode.from([1, 2, 4, 5])
    );
    expect(ListNode.from([1, 3, 4]).push(8)).toStrictEqual(
        ListNode.from([1, 3, 4, 8])
    );
    expect(ListNode.from([1, 1, 2, 3, 4, 4]).push(10)).toStrictEqual(
        ListNode.from([1, 1, 2, 3, 4, 4, 10])
    );
});
