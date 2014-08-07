/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    var timeA = new Date();

    var xSep = 10,
        ySep = 20,
        nodeR = 4;

    var iTree = Tree
        .init(treeDataCreator(5, 2, 2))
        .createMap()
        .createBreadth()
        .layout(xSep, ySep);

    var $tree = d3.select('#canvas')
            .append('g')
            .attr('class', 'tree')
            .attr('transform', 'translate(10,10)'),

        $edges = $tree
            .append('g')
            .attr('class', 'edges'),

        $nodes = $tree
            .append('g')
            .attr('class', 'nodes');


    function toggleTree(oTree, tree) {
        if (tree.children) {
            tree._children = tree.children;
            delete tree.children;
        } else if (tree._children) {
            tree.children = tree._children;
            delete tree._children;
        }
        oTree.layout(xSep, ySep);
        render(oTree);
    }

    function render(oTree) {
        $edges.html('');
        $nodes.html('');

        oTree.bfs(function (tree) {
            if (tree.parent) {
                $edges
                    .append('line')
                    .attr('class', 'edge')
                    .attr('x1', tree.parent.x)
                    .attr('y1', tree.parent.y)
                    .attr('x2', tree.x)
                    .attr('y2', tree.y);
            }
            $nodes
                .append('circle')
                .attr('class', 'node')
                .attr('r', nodeR)
                .attr('cx', tree.x)
                .attr('cy', tree.y)
                .on('mouseover', function () {
                    console.log('id:', tree.id);
                })
                .on('click', function () {
                    toggleTree(oTree, tree);
                });
        });
    }

    render(iTree);


    var timeB = new Date();
    console.log(timeB.getTime() - timeA.getTime());
});
