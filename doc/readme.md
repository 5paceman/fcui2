
## 注释语法说明

* 注释数据由YUIDoc工具生成，基本语法见：http://yui.github.io/yuidoc/syntax/index.html。
* YUIDoc能把注释块中所有带@前缀的标签及其描述解析出来，因此我们的文档除使用部分YUIDoc官方标签外，还有一些自定义标签。
* 我们没有使用YUIDoc官方或第三方文档显示模板，而是用fcui2自制了一套简易模板。下面给出模板能解析和正确显示的标签。
* 文档中以"// "开头，或以"/*"和"*/"包含的注释将不被解析，只有以"/**"和"*/"包含的才会被解析。

### 官方标签
###### 一级标签

###### 二级标签   

    @author 文档作者，只在文件的第一个注释块中有效。

    @email 作者邮箱，只在文件的第一个注释块中有效。

    @param 参数标签，包括一个参数的名称、类型、默认值等，模板支持二级param

        @param标签支持从其他文件直接导入注释，如@param {Import|Properties} src\Button.jsx.js skin className，
        作用是从src\Button.jsx.js文件里含有properties属性的注释块中，导入name为skin或className的param注释。


### 自定义标签

###### 一级标签
    @properties 表明该注释块是属性集，其中描述了fcui2组件的this.props默认集合

###### 二级标签