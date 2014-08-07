/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {


    var iTree = Tree.init(treeDataCreator(3, 2, 4), function (oParent, oTree, dTree, index) {
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


    var iCanvas = d3.select('#canvas'),
        iNodes = iCanvas.append('g').attr('class', 'nodes');


});
