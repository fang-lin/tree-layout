/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {
    function createTree(maxDepth, minChildrenCount, maxChildrenCount, fn) {

        var tree = {};

        (function create(subTree, depth, parent, index) {
            if (fn) {
                fn(subTree, depth, parent, index);
            }
            if (typeof subTree.id === 'undefined') {
                subTree.id = (parent === -1) ? index : parent + '-' + index;
            }
            if (typeof subTree.parent === 'undefined') {
                subTree.parent = parent;
            }

            if (depth < maxDepth) {
                var children = [];
                for (var count = _.random(minChildrenCount, maxChildrenCount); count > 0; --count) {
                    children.push({});
                }
                children.forEach(function (node, index) {
                    create(node, depth + 1, subTree.id, index);
                });
                subTree.children = children;
            }
        })(tree, 0, -1, 0);

        return tree;
    }

    window.createTree = createTree;
})();