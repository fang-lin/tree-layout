/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {

    function Tree(data) {
        this.id = data.id;
    }

    Tree.init = function (data, fn) {
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
        createBreadth: function () {
            var breadth = 0,
                depth = 0;
            this.bfs(function (tree) {
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
        createMap: function (fn) {
            var map = {};
            this.dfs(function (tree) {
                if (fn) {
                    fn(tree, map)
                } else {
                    map[tree.id] = tree;
                    tree.map = map;
                }
            });
            return this;
        },
        getTree: function (id) {
            return this.map[id];
        },
        layout: function (xSep, ySep) {
            var tTree;
            this.dfs(function (tree) {

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

            return this;
        }
    };

    window.Tree = Tree;
})();


