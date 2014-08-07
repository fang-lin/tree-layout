/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    var xSep = 10,
        ySep = 20,
        nodeR = 4;

    var iTree = Tree.init(treeDataCreator(5, 2, 3), function (oParent, oTree, dTree, index) {
        oTree.data = Math.random();
    });
    iTree
        .createMap()
        .createBreadth();

//    iTree.dfs(function (tree) {
//        console.log(tree);
//    });

//    iTree.bfs(function (tree) {
//        console.log(tree);
//    });


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

    var tTree;

    iTree.dfs(function (tree) {

        if (tTree) {
            tree.x = tTree.x;

            if (tree.depth <= tTree.depth) {
                tree.x += xSep;
                var pTree = tree;
                while (pTree.parent) {
                    pTree = pTree.parent;
                    pTree.x += xSep * .5;
                }
            }
        } else {
            tree.x = 0;
        }

        tree.y = tree.depth * ySep;
        tTree = tree;
    });

    iTree.dfs(function (tree) {

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
                console.log(tree.id);
            })
    });
});
