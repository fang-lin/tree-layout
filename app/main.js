/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    var $stage = d3.select('#stage');

    for (var fIndex = 0; fIndex < 2; ++fIndex) {

        var $forest = $stage
                .append('svg'),
            name = $forest.attr('name'),
            stage = new Stage($forest, [12, 16]);

        for (var tIndex = 0; tIndex < 2; ++tIndex) {
            var tree = Tree.factory(treeDataCreator(7, 1, 2, function (node, depth, pId) {
                if (!pId) {
                    node.id = char(fIndex) + char(tIndex) + '-' + node.id;
                }
            }));

            stage.forest.push(tree);
        }

        stage.draw();
        $stage.append('br');
    }
});
