/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {

    function Stage($forestLayer, grid, size, radius) {
        this.$forestLayer = $forestLayer;
        this.grid = grid || [1, 1];
        this.setSize(size || [320, 240]);
        this.nodeRadius = radius || 4;

        this.forest = [];

        this.subTreeMap = {};
    }

    Stage.prototype = {
        constructor: Stage,

        setSize: function (size) {
            this.size = size;
            this.$forestLayer
                .attr('width', size[0])
                .attr('height', size[1]);

            return this;
        },

        draw: function () {

            this.$forestLayer.html('');
            var self = this,
                size = this.forest.reduce(function (rect, tree) {

                    rect[0] += self.grid[0];

                    var treeSize = tree
                            .createList()
                            .layout(self.grid),

                        $treeLayer = self.$forestLayer
                            .append('g')
                            .attr('transform', 'translate(' + rect[0] + ',' + self.grid[1] + ')')
                            .classed('tree-layer', true),

                        $edgesLayer = $treeLayer
                            .append('g')
                            .classed('edges-layer', true),

                        $nodesLayer = $treeLayer
                            .append('g')
                            .classed('nodes-layer', true);

                    self.drawTree($edgesLayer, $nodesLayer, tree);
                    if (rect[1] < treeSize[1]) {
                        rect[1] = treeSize[1]
                    }
                    return [rect[0] + treeSize[0], rect[1]];

                }, [0, 0]);

            self.setSize([
                    size[0] + self.grid[0],
                    size[1] + self.grid[1] * 2
            ]);
        },

        drawTree: function ($edgesLayer, $nodesLayer, tree) {
            var self = this;

            tree.list.forEach(function (node) {
                if (node.parent) {

                    $edgesLayer
                        .append('line')
                        .classed('edge', true)
                        .attr('id', node.parent.id + '_' + node.id)
                        .attr('x1', node.parent.x)
                        .attr('y1', node.parent.y)
                        .attr('x2', node.x)
                        .attr('y2', node.y);
                }

                var $node = $nodesLayer
                    .append('circle')
                    .classed('node', true)
                    .attr('id', node.id)
                    .attr('cx', node.x)
                    .attr('cy', node.y)
                    .attr('r', self.nodeRadius)
                    .on('click', function () {
                        node.toggle();
                        self.draw();
                    })
                    .on('mouseover', function () {
                        d3.select('#' + node.id)
                            .classed('self', true);

                        self.hoverSubTree(node, true)
                            .hoverParent(node, true);
                    })
                    .on('mouseout', function () {
                        d3.select('#' + node.id)
                            .classed('self', false);

                        self.hoverSubTree(node, false)
                            .hoverParent(node, false);
                    });

                node._children && $node.classed('toggle', true);
            });

            return this;
        },

        hoverSubTree: function (tree, is) {
            var list = this.subTreeMap[tree.id];

            if (!list) {
                tree.dfs(function (node) {
                    if (list) {
                        list.push(node.id);
                        list.push(node.parent.id + '_' + node.id);
                    } else {
                        list = [];
                    }
                });
                this.subTreeMap[tree.id] = list;
            }

            list.forEach(function (id) {
                d3.select('#' + id)
                    .classed('child', is);
            });

            setLabel(tree, is);

            return this;
        },

        hoverParent: function (tree, is) {
            var pTree = tree;

            while (pTree.parent) {
                d3.select('#' + pTree.parent.id + '_' + pTree.id)
                    .classed('parent', is);

                pTree = pTree.parent;

                d3.select('#' + pTree.id)
                    .classed('parent', is);
            }

            return this;
        }
    };

    window.Stage = Stage;

})();