---
title: "Python 数据可视化：JSON 格式转化与 Pyecharts 地图视觉映射"
category: "python"
categoryLabel: "Python 学习"
subTag: "数据可视化"
date: "2026-09-24"
readTime: "6 分钟"
summary: "梳理 json.dumps / json.loads 数据转化流程，结合 Map 类与 VisualMapOpts 分段配色绘制中国及省级地理热力图。"
csdnUrl: "https://github.com/lose-sea/python_learning"
featured: false
---

# json 格式 

## 什么是json

+ JSON 是一种轻量级的数据交互格式, 可以按照JSON指定的格式去组织和封装数据
+ JSON 本质上是一个带有特定格式的字符串 

### 主要功能

json 就是一种在各个编程语言中流通的数据格式, 负责不同编程语言中的数据传递和交换


各种编程语言存储数据的容器不尽相同, 在 Python 中有字典 dict 这样的数据类型, 而其他语言可能没有字典

为了让不同的语言都能够相互通用的互相传递数据, JSON 就是一种非常良好的数据格式. 

以python 和 C语言互传数据为例: 


> 📷 *（此处原笔记附有本地运行示意图）*


# json 格式数据转化

json 格式的数据要求很严格

```python
 # json 格式可以是: 
{"name": "admin", "age": 19}
# 也可以是: 
[{"name": "admin", "age": 19}, {"name": "admin", "age": 19}]
```

在python语言中, python 和 json 格式是无缝切换的, json就是python的列表或者字典, **如果是列表, 就要求列表内部嵌套的是字典**, 

### python数据和JSON数据的相互转化

在python内置的json模块中, 在json模块中, 提供了两个方法可以完成python 数据和 json 数据的相互转化  

#### 导入json模块并准备符合json格式要求的python数据  

```python
import json
data = [{"name": "张三", "age": 19}, {"name": "admin", "age": 19}]
```


#### 通过json.dumps(data)方法将python数据转化为 json 数据

```python
jsondata = json.dumps(data)
print(jsondata) # [{"name": "\u5f20\u4e09", "age": 19}, {"name": "admin", "age": 19}]
print(type(jsondata)) # <class 'str'>
```

**json 本质上就是一个字符串 ** 

这里打印json数据中文变成了 `\u 5f20\u4e09`, 这是因为中文在转化的时候会涉及到一个编码问题, 要解决这个问题,只需要在传入参数的时候再传入一个参数 `ensure_ascll = False`, 表示不使用ASCll 去转换它, 而是直接输出 

```python
jsondata = json.dumps(data, ensure_ascii=False)
```

这样中文就可以正常打印了

#### 通过json.loads(jsondata) 方法将是json 数据转化为python 数据

```python
data = json.loads(jsondata)
```

---

# 地图

### 导入包

要生成地图首先要导入对应的包 `Map`

地图图表类, 用于创建地图可视化


```python
# 导包
from pyecharts.charts import Map
```


### 实例化一个地图对象

```python
map = Map()
```


### 准备数据 

```python
data = [
    ("北京市", 99),
    ("上海市", 199),
    ("湖南省", 299),
    ("广东省", 399),
]
```

**注意这里要写地区的全名, 如  “北京市”, “广东省”, 直接写 “北京”, “广东”是不行的**

### 添加数据到地图 

```python
# 添加数据
# 名称, 数据, 地图类型
map.add("测试地图", data_pair= data, maptype= "china")
```

这里的第三个参数是地图类型, “china”, 表示是中国地图

> - `"测试地图"`：系列名称（图例显示的名称）。
> - `data_pair`：传入准备好的数据。
> - `maptype="china"`：指定地图类型为中国地图（pyecharts 内置了中国地图的 GeoJSON）。 

### 配置全局选项

这里配置可视化

首先要导入可视化对应的包


```python
from pyecharts.options import VisualMapOpts
```

然后开启视觉映射图

还可以自定义分段式映射和自定义分段规则

```python
# 设置全局选项
map.set_global_opts(
    visualmap_opts= VisualMapOpts(
        # 开启视觉映射
        is_show=True,
        # 开启手动校准范围
        is_piecewise=True,
        pieces=[
            # 区间最小值
            # 区间最大值
            # 标签名称
            # 颜色代码
            {"min": 1, "max": 9, "label": "1-9", "color": "#CCFFFF"},
            {"min": 10, "max": 99, "label": "10-99", "color": "#FF6666"},
            {"min": 100, "max": 500, "label": "100-500", "color": "#990033"}
        ]
    )
)
```

### 生成图像

```python
map.render() 
```


> 📷 *（此处原笔记附有本地运行示意图）*


完整代码如下: 

```python
# 导包
from pyecharts.charts import Map
from pyecharts.options import VisualMapOpts

map = Map()

data = [
    ("北京市", 99),
    ("上海市", 199),
    ("湖南省", 299),
    ("广东省", 399),
]

# 添加数据
# 名称, 数据, 地图类型
map.add("测试地图", data_pair= data, maptype= "china")

# 设置全局选项
map.set_global_opts(
    visualmap_opts= VisualMapOpts(
        # 开启视觉映射
        is_show=True,
        # 开启手动校准范围
        is_piecewise=True,
        pieces=[
            # 区间最小值
            # 区间最大值
            # 标签名称
            # 颜色代码
            {"min": 1, "max": 9, "label": "1-9", "color": "#CCFFFF"},
            {"min": 10, "max": 99, "label": "10-99", "color": "#FF6666"},
            {"min": 100, "max": 500, "label": "100-500", "color": "#990033"}
        ]
    )
)


map.render()
```
