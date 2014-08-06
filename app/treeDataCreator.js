/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {

    function treeDataCreator(maxDepth, minChildrenCount, maxChildrenCount, fn) {
        var data = {};

        (function create(tree, depth, pId, index) {

            tree.id = pId ? pId + '-' + index : index;
            fn && fn(tree, depth, pId, index);

            if (depth < maxDepth) {
                var children = [],
                    maxCount = _.random(minChildrenCount, maxChildrenCount);

                ++depth;

                for (var count = 0; count < maxCount; ++count) {
                    var node = {};
                    children.push(node);
                    create(node, depth, tree.id, count);
                }

                tree.children = children;
            }
        })(data, 0, null, '0');

        return data;
    }

    window.treeDataCreator = treeDataCreator;

})();