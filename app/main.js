/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    var stageSize = [640, 220],
        gird = [30, 50],
        nodeR = 4,
        idPrefix = 'tree-';

    var $svg = d3.select('#svg'),
        $forest = $svg
            .append('g')
            .attr('class', 'forest')
            .attr('transform', 'translate(30,10)');


    var forest = [];

    $.getJSON('data/trees.json', function (treesData) {
        var timeA = new Date();

//        var offset = treesData.reduce(function (offset, data, index) {
//
//            var nodesMap = {};
//            data.nodes.forEach(function (node) {
//                nodesMap[node.id] = node;
//            });
//
//            var iTree = Tree
//                .init(data.tree, function (oParent, oTree, dTree, index) {
//                    oTree.node = nodesMap[dTree.id];
//                })
//                .createMap()
//                .createBreadth();
//
        var $tree = $forest
            .append('g')
            .classed('tree', true);
//            var treeSize = iTree.layout(gird[0], gird[1]);
//
//            offset += gird[0];
//
//            render(iTree, idPrefix, $tree, treeSize);
//
//            forest.push(iTree);
//
//            return offset + treeSize[0];
//
//        }, 0);
//
//        $svg.style('height', offset + 20);

        console.log(forest);

        var data = treesData[1];

        var nodesMap = {};
        data.nodes.forEach(function (node) {
            nodesMap[node.id] = node;
        });

        var iTree = Tree
            .init(data.tree, function (oParent, oTree, dTree, index) {
                oTree.node = nodesMap[dTree.id];
            })
            .createMap()
            .createBreadth();

        forest.push(iTree);

        iTree.scale(stageSize, iTree.layout(10, 20));

        render(iTree, idPrefix, $tree);
        var timeB = new Date();
        console.log(timeB.getTime() - timeA.getTime());
    });


//    var iTree = Tree
//        .init(treeDataCreator(10, 2, 2))
////        .init(treeDataCreator(3, 1, 1))
//        .createMap()
//        .createBreadth();
//
//    iTree.scale(stageSize, iTree.layout(10, 20));


    function toggleTree(oTree, tree, $wrap) {
        if (tree.children) {
            tree._children = tree.children;
            delete tree.children;
        } else if (tree._children) {
            tree.children = tree._children;
            delete tree._children;
        }
        oTree.layout(gird[0], gird[1]);
        render(oTree, idPrefix, $wrap);
    }

    function render(oTree, idPrefix, $wrap, treeSize) {

//        var height = $wrap.attr('height');
//
//        var offset = 0;
//
//        d3.selectAll('g.tree').each(function (g, index, trees) {
//            offset += d3.select(g).style('height');
//            d3.select(g)
//                .attr('transform', 'translate(' + offset + ',10)');
//        });

        $wrap.html('');

        var $edges = $wrap
                .append('g')
                .classed('edges', true),

            $nodes = $wrap
                .append('g')
                .classed('nodes', true);

        oTree.bfs(function (tree) {
            if (tree.parent) {
                $edges
                    .append('line')
                    .classed('edge', true)
                    .attr('x1', tree.parent.x)
                    .attr('y1', tree.parent.y)
                    .attr('x2', tree.x)
                    .attr('y2', tree.y)
                    .on('mouseover', function () {
                        d3.select(this).classed('edge-hover', true);
                    })
                    .on('mouseout', function () {
                        d3.select(this).classed('edge-hover', false);
                    });
            }

            var $node = $nodes
                .append('g')
                .classed('node', true)
                .attr('transform', 'translate(' + tree.x + ',' + tree.y + ')');

            $node
                .append('text')
                .attr('x', -6)
                .attr('dy', 3)
                .attr('text-anchor', 'end')
                .html(tree.node.cat + (tree.node.isHead ? '*' : ''));

            $node
                .append('circle')
                .attr('id', idPrefix + tree.id)
                .attr('r', nodeR)
                .on('mouseover', function () {
                    d3.select(this).classed('node-hover', true);
                })
                .on('mouseout', function () {
                    d3.select(this).classed('node-hover', false);
                })
                .on('click', function () {
                    toggleTree(oTree, tree, $wrap);
                });
        });
    }

//    render(iTree, idPrefix);

//    iTree.bfs(function (tree) {
//        setTimeout(function () {
//            d3.select('#tree-' + tree.id).on('click')();
//        }, 1000 - 200 * tree.depth);
//    });
//
//    iTree.bfs(function (tree) {
//        setTimeout(function () {
//            d3.select('#tree-' + tree.id).on('click')();
//        }, 1500 + 200 * tree.depth);
//    });


});
