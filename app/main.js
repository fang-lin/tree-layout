/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {
    $.getJSON('data/tree-1.json', function (tree) {

        var treeHashmap = Tree.dualMap(tree),
            scale = {
                x: 48,
                y: 32
            },
            $canvas = $('#tree-canvas');

        var nodeHover = [
            function () {
                var nodeId = $(this).attr('id');
                Tree.DFSPreOrder(treeHashmap[nodeId]).forEach(function (id) {
                    $('#' + id).addClass('current');
                });
            },
            function () {
                var nodeId = $(this).attr('id');
                Tree.DFSPreOrder(treeHashmap[nodeId]).forEach(function (id) {
                    $('#' + id).removeClass('current');
                });
            }
        ];

        Tree.DFSPreOrder(tree).reduce(function (prevNode, nodeId, index) {

            var node = treeHashmap[nodeId],
                parent = treeHashmap[node.parent] || {
                    breadth: 0,
                    depth: 0
                },
                $node = $('<div class="node"/>');

            $node.attr('id', nodeId)
                .html(nodeId)
                .css('left', parent.breadth * scale.y)
                .css('top', parent.depth * scale.x);

            $canvas.append($node);

            node.breadth = prevNode.breadth;
            if (index) {
                if (node.depth <= prevNode.depth) {
                    node.breadth++;
                }
            }

            setTimeout(function () {
                $node
                    .hover(nodeHover[0], nodeHover[1])
                    .addClass('fade-in')
                    .css('left', node.breadth * scale.y)
                    .css('top', node.depth * scale.x);
            }, index * 200);

            return node;
        }, {
            id: null,
            breadth: 0
        });
    });
});
