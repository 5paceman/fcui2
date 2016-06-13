

define(function (require) {
    
    return {

        getLeafItem: function (datasource, indexs) {
            var result = {children: datasource};
            for (var i = 0; i < indexs.length; i++) {
                var index = parseInt(indexs[i], 10);
                if (isNaN(index)) continue;
                if (result.children instanceof Array && result.children.length > index) {
                    result = result.children[index];
                }
            }
            return result;
        },

        getNodeSelectInfo: function (item, selectedHash, index, loadCache) {
            loadCache = loadCache || {};
            index = index || '';
            // 已缓存
            if (loadCache.hasOwnProperty(index)) {
                return loadCache[index];
            }
            var result = {
                total: 0,
                selected: 0
            };
            // 叶子
            if (!(item.children instanceof Array)) {
                result.total = result.selected = selectedHash[item.value] === true ? 1 : 0;
                loadCache[index] = JSON.parse(JSON.stringify(result));
                console.log('write:' +  index);
                return result;
            }
            // 树
            for (var i = 0; i < item.children.length; i++) {
                var child = item.children[i];
                var childIndex = index + ',' + i;
                if (!loadCache.hasOwnProperty(childIndex)) {
                    this.getNodeSelectInfo(child, selectedHash, childIndex, loadCache);
                }
                var cache = loadCache[childIndex];
                result.total += cache.total;
                result.selected += cache.selected;
            }
            loadCache[index] = JSON.parse(JSON.stringify(result));
            return result;
        },

        dualTreeSelectorEngine: {

            /**
             * 此处逻辑：
             * （1）如果当前节点是叶子节点，标记为true
             * （2）如果当前节点不是叶子节点，在其树下所有叶子标记为true
             * （3）如果当点节点有children属性，但children长度为0，则将此节点标记为1
             */
            select: function (selected, item) {

                if (!(item.children instanceof Array)) {
                    selected[item.value] = true;
                    return;
                }

                if (item.children.length === 0) {
                    selected[item.value] = 1;
                    return;
                }

                targetChildren(item.children);

                function targetChildren(arr) {
                    if (!(arr instanceof Array)) return;
                    for (var i = 0; i < arr.length; i++) {
                        var child = arr[i];
                        if (child.children instanceof Array) {
                            targetChildren(child.children);
                            continue;
                        }
                        selected[child.value] = true;  
                    }
                }
            },

            /**
             * 此处逻辑
             * （1）如果是叶子，则删除
             * （2）如果不是叶子，则删除该子树上的所有叶子
             */
            unselect: function (selected, item) {

                if (!(item.children instanceof Array)) {
                    delete selected[item.value];
                    return;
                }

                delChildren(item.children);

                function delChildren(arr) {
                    if (!(arr instanceof Array)) return;
                    for (var i = 0; i < arr.length; i++) {
                        var child = arr[i];
                        if (child.children instanceof Array) {
                            delChildren(child.children);
                            continue;
                        }
                        delete selected[child.value];  
                    }
                }
            }
        }
    };   
});