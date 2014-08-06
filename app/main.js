/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {


    var myTree = Tree.init(treeDataCreator(2, 3, 3), function (oParent, oTree, dTree, index) {
//    console.log(oParent, oTree, dTree, index);
        oTree.data = Math.random();
    });

//myTree.dfs(function (tree) {
//    console.log(tree);
//});
    myTree.bfs(function (tree) {
        console.log(tree);
    });

    myTree.createMap();

    
});
