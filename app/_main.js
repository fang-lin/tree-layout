/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    function renderTree() {

        var width = 480,
            height = 320;

        var tree = createTree(3, 2, 2);

        var treeHashmap = Tree.hashmap(tree),
            scale = {
                x: 8,
                y: 16
            },
            $canvas = $('#tree-canvas').html('');

//        var nodeHover = [
//            function () {
//                var nodeId = $(this).attr('id');
//                Tree.DFSPreOrder(treeHashmap[nodeId]).forEach(function (id) {
//                    $('#' + id).addClass('current');
//                });
//            },
//            function () {
//                var nodeId = $(this).attr('id');
//                Tree.DFSPreOrder(treeHashmap[nodeId]).forEach(function (id) {
//                    $('#' + id).removeClass('current');
//                });
//            }
//        ];

        Tree.DFSPreOrder(tree).reduce(function (prevNode, nodeId, index) {

            var node = treeHashmap[nodeId];

            node.breadth = prevNode.breadth;
            if (index) {
                if (node.depth <= prevNode.depth) {
                    ++node.breadth;
                    (function getParent(subTree) {
                        if (subTree.parent !== -1) {
                            var parentNode = treeHashmap[subTree.parent];
                            parentNode.breadth += .5;
                            getParent(parentNode);
                        }
                    })(node);
                }
            }

            return node;
        }, {
            id: null,
            breadth: 0
        });


        Tree.BFSStratified(tree).forEach(function (stratification, depth) {

            stratification.forEach(function (nodeId, index) {
                var node = treeHashmap[nodeId],
                    parent = treeHashmap[node.parent] || node;

                var $node = $('<div class="node"/>');

                $node.attr('id', nodeId)
                    .css('left', parent.breadth * scale.x)
                    .css('top', parent.depth * scale.y);

                $canvas.append($node);

                setTimeout(function () {
                    $node
                        .attr('title', 'id: ' + nodeId + '\nbreadth: ' + node.breadth + '\ndepth: ' + node.depth)
                        .addClass('fade-in')
                        .css('left', node.breadth * scale.x)
                        .css('top', node.depth * scale.y);
//                        .hover(nodeHover[0], nodeHover[1]);
                }, depth * 200);
            });
        });


    }

    $('#refresh-tree').click(function () {
        renderTree();
    }).click();

});
