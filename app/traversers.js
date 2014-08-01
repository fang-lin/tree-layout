/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {

    function clone(tree) {
        var newTree;


    }

    function DFSPreOrder(tree) {
        var list = [];

        (function traverse(subTree, depth) {
            list.push(subTree.id);
            subTree.depth = depth;

            if (subTree.children) {
                depth++;
                subTree.children.forEach(function (tree) {
                    traverse(tree, depth);
                });
            }
        })(tree, 0);

        return list;
    }

    function DFSPostOrder(tree) {
        var list = [];

        (function traverse(subTree) {
            if (subTree.children) {
                subTree.children.forEach(function (tree) {
                    traverse(tree);
                });
            }
            list.push(subTree.id);
        })(tree);

        return list;
    }

    function BFS(tree) {
        var list = [];

        (function traverse(trees) {
            var subTrees = [];
            trees.forEach(function (tree) {
                list.push(tree.id);
                if (tree.children) {
                    subTrees = subTrees.concat(tree.children);
                }
            });
            subTrees.length && traverse(subTrees);
        })([tree]);

        return list;
    }

    function BFSStratified(tree) {
        var list = [];

        (function traverse(trees) {
            var subTrees = [],
                level = [];
            trees.forEach(function (tree) {
                level.push(tree.id);
                if (tree.children) {
                    subTrees = subTrees.concat(tree.children);
                }
            });
            list.push(level);
            subTrees.length && traverse(subTrees);
        })([tree]);

        return list;
    }

    function paths(tree) {
        var paths = [];

        (function traverse(subTree, basePath) {
            basePath.push(subTree.id);

            if (subTree.children) {
                subTree.children.forEach(function (node) {
                    traverse(node, basePath.concat());
                });
            } else {
                paths.push(basePath);
            }
        })(tree, []);

        return paths;
    }

    function dualMap(tree) {
        var map = {};

        (function traverse(subTree, parentId) {
            subTree.parent = parentId;
            map[subTree.id] = subTree;

            if (subTree.children) {
                subTree.children.forEach(function (tree) {
                    traverse(tree, subTree.id);
                });
            }
        })(tree, null);

        return map;
    }

    window.Tree = {
        clone: clone,
        DFSPreOrder: DFSPreOrder,
        DFSPostOrder: DFSPostOrder,
        BFS: BFS,
        BFSStratified: BFSStratified,
        paths: paths,
        dualMap: dualMap
    }
})();