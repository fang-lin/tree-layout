/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {

    function treeDataCreator(maxDepth, minChildrenCount, maxChildrenCount, fn) {
        var data = {};

        (function create(tree, depth, pId, index) {

            tree.id = pId ? pId + index : index;
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

    function setLabel(tree, is) {

        if (is) {
            $('#label-id').html(tree.id);
            $('#label-breadth').html(tree.breadth);
            $('#label-depth').html(tree.depth);
            $('#label-index').html(tree.index);
            $('#label-parentId').html(tree.parent ? tree.parent.id : 'null');
            $('#label-x').html(tree.x);
            $('#label-y').html(tree.y);
        } else {
            $('#label-id').html('');
            $('#label-breadth').html('');
            $('#label-depth').html('');
            $('#label-index').html('');
            $('#label-parentId').html('');
            $('#label-x').html('');
            $('#label-y').html('');
        }
    }

    window.setLabel = setLabel;

    var chars = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';

    function char(index) {
        return chars.slice(index, index + 1);
    }

    window.char = char;

})();