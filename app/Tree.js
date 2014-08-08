/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {

    function Tree(data) {
        this.id = data.id;
    }

    Tree.factory = function (data, fn) {

        var oTree = new Tree(data);
        oTree.depth = 0;

        (function dfs(oParent, oTree, dTree, index) {
            oTree.index = index;

            if (oParent) {
                oTree.parent = oParent;
                oTree.depth = oParent.depth + 1;
                oParent.children = oParent.children || [];
                oParent.children.push(oTree);
            }

            if (dTree.children) {
                dTree.children.forEach(function (sTree, index) {
                    dfs(oTree, new Tree(sTree), sTree, index);
                });
            }

            fn && fn(oParent, oTree, dTree, index);

        })(null, oTree, data, 0);

        return oTree;
    };

    var iterator = Tree.iterator = {
        dfs: function (tree, prevFn, postFn) {
            prevFn && prevFn(tree);

            if (tree.children) {
                tree.children.forEach(function (child) {
                    iterator.dfs(child, prevFn, postFn);
                });
            }

            postFn && postFn(tree);
        },

        bfs: function (trees, fn) {
            var children = [];

            trees.forEach(function (tree) {
                fn && fn(tree);

                if (tree.children) {
                    children = children.concat(tree.children);
                }
            });

            children.length && iterator.bfs(children, fn);
        }
    };

    Tree.prototype = {
        constructor: Tree,

        dfs: function (prevFn, postFn) {
            iterator.dfs(this, prevFn, postFn);

            return this;
        },

        bfs: function (fn) {
            iterator.bfs([this], fn);

            return this;
        },

        createList: function () {
            var list = [];

            this.dfs(function (tree) {
                list.push(tree);
                tree.list = list;
            });

            return this;
        },

        createMap: function (fn) {
            var map = {};

            this.list.forEach(function (tree) {
                map[tree.id] = tree;
                tree.map = map;
            });

            return this;
        },

        createBreadth: function () {

            var breadth = 0,
                depth = 0;

            this.list.forEach(function (tree) {
                if (tree.parent) {
                    if (tree.depth > depth) {
                        depth = tree.depth;
                        breadth = 0;
                    } else {
                        breadth++;
                    }
                }
                tree.breadth = breadth;
            });

            return this;
        },

        getTree: function (id) {
            return this.map[id];
        },

        toggle: function () {
            if (this.children) {

                this._children = this.children;
                delete this.children;

            } else if (this._children) {

                this.children = this._children;
                delete this._children;
            }
        },

        layout: function (grid) {

            this.createBreadth();

            var tTree,
                rect = [0, 0],
                gx = grid && grid[0] ? grid[0] : 1,
                gy = grid && grid[1] ? grid[1] : 1;

            this.list.forEach(function (tree) {
                if (tTree) {
                    tree.x = tTree.x;
                    if (tree.depth <= tTree.depth) {
                        tree.x += gx;
                        var pTree = tree;
                        while (pTree.parent) {
                            pTree = pTree.parent;
                            pTree.x += gx * .5;
                        }
                    }
                } else {
                    tree.x = 0;
                }

                tree.y = tree.depth * gy;

                rect[0] < tree.x && (rect[0] = tree.x);
                rect[1] < tree.y && (rect[1] = tree.y);

                tTree = tree;
            });

            return rect;
        },

        scale: function (stageSize, treeSize) {

            var gx = stageSize && stageSize[0] ? stageSize[0] : 320,
                gy = stageSize && stageSize[1] ? stageSize[1] : 320,
                tx = treeSize && treeSize[0] ? treeSize[0] : 0,
                ty = treeSize && treeSize[1] ? treeSize[1] : 0;

            var scale = [gx / tx, gy / ty];

            this.list.forEach(function (tree) {
                tree.x = scale[0] === Infinity ? gx / 2 : tree.x * scale[0];
                tree.y = scale[1] === Infinity ? gy / 2 : tree.y * scale[1];
            });

            return this;
        }
    };

    window.Tree = Tree;
})();


