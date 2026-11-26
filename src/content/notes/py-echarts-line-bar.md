---
title: "Python 数据可视化：Pyecharts 折线图与动态时间线柱状图"
category: "python"
categoryLabel: "Python 学习"
subTag: "数据可视化"
date: "2026-09-18"
readTime: "6 分钟"
summary: "从零掌握 Pyecharts 全局配置项与系列配置项，构建折线图、翻转柱状图与 Timeline 动态趋势时间线图表。"
csdnUrl: "https://blog.csdn.net/for_ever_love__?type=lately"
featured: true
---

# pyecharts 模块

如果想要做出数据可视化效果图, 可以借助 pyecharts 模块来完成 


Echars 是由百度开源的数据可视化, 凭借着良好的交互性, 精巧的图标设计, 得到了众多开发者的认可, 而 python 是门富有表达力的语言, 很适合用于数据处理, 当数据分析遇上数据可视化时, pyecharts 诞生了. 


[pyecharts画廊](https://gallery.pyecharts.org/#/Bar/stack_bar_percent), 在这个网站可以查看pyecharts 的各种图表以及其源码, 

## pyecharts 入门

### 构建一个基础的折现图

```python
from pyecharts.charts import Line

# 得到折线图对象
line = Line()

# 添加x轴数据
line.add_xaxis(["中国", "美国", "英国"])

# 添加y轴数据
line.add_yaxis("GDP", [30, 20, 10])

# 通过 render 方法, 将代码生成为生成图表
line.render()
```

运行成功会生成一个`render.html` 的文件,打开就可以看到构建的折线图了


> 📷 *（此处原笔记附有本地运行示意图）*


### pyecharts 的配置选项

在pyecharts 模块中有很多的配置选项, 常用到的2个类别的选项: 

1. 全局配置选项
2. 系列配置选项 

全局配置就是针对整个图像去进行设置, 例如图像的标题, 图例, 工具箱等

系列配置就是针对具体的轴数据进行配置

### 全局配置

全局配置可以通过 `set_global_opts` 方法来进行配置, 


```python
# 设置全局配置项
line.set_global_opts(
    # 设置标题内容, 位置居中
    title_opts = TitleOpts(title= "GDP 展示", pos_left="center", pos_bottom="10%"),
    # 设置图例
    legend_opts=LegendOpts(is_show=True),
    # 工具箱
    tooltip_opts=TooltipOpts(is_show=True),
    # 视觉映射
    visualmap_opts=VisualMapOpts(is_show=True)
)
```

要进行这些配置项的设置,都要导入对应的模块 

`from pyecharts.options import TitleOpts, LegendOpts, TooltipOpts, VisualMapOpts`


> 📷 *（此处原笔记附有本地运行示意图）*

---

# 柱状图

## 基础柱状图


### 导入包

```python
# 导包
from pyecharts.charts import Bar
```


### 实例化柱状图对象 

```python
bar = Bar()
```

 

### 添加数据


```python
# 添加 x 轴数据
bar.add_xaxis(["中国", "美国", "英国"])

# 添加 y 轴数据
bar.add_yaxis("GDP", [30, 20, 10]) 
```


### 生成图像 

```python
bar.render() 
```

这样就完成了一个简单的柱状图


> 📷 *（此处原笔记附有本地运行示意图）*


### 其他设置 

#### 翻转 x 轴和 y 轴 

通过reversal_axis() 方法可以翻转 x 轴和 y 轴 

```python
bar.reversal_axis()
```

效果图: 


> 📷 *（此处原笔记附有本地运行示意图）*


#### 设置数值显示的位置

要实现这个功能还需要导入对应的包

```python
from pyecharts.options import LabelOpts
```

在传入 y 轴数据的时候设置

```python
bar.add_yaxis("GDP", [30, 20, 10],label_opts=LabelOpts(position="right"))
```

效果 


> 📷 *（此处原笔记附有本地运行示意图）*


## 基础时间线柱状图


### 时间线

Timeline() 时间线 

柱状图描述的是分类数据，回答的是每一个分类中『有多少？』这个问题。这是柱状图的主要特点，同时柱状图很难动态的描述一个趋势性的数据。这里 pyecharts 为我们提供了一种解决方案‑时间线 

如果说一个 Bar、Line 对象是一张图表的话，时间线就是创建一个一维的 x 轴，轴上每一个点就是一个图表对象


### 绘制 

#### 导入包 

相对于基础的柱状图,绘制时间线柱状图还需要导入 Timeline 包

```python
from pyecharts.charts import Bar, Timeline
from pyecharts.options import LabelOpts
```

####  准备数据

在时间线上的不同点, 需要展示不同的柱状图, 这就要准备多个柱状图

```python
bar1 = Bar()
bar1.add_xaxis(["中国", "美国", "英国"])
bar1.add_yaxis("GDP", [30, 30, 20], label_opts=LabelOpts(position="right"))
bar1.reversal_axis()

bar2 = Bar()
bar2.add_xaxis(["中国", "美国", "英国"])
bar2.add_yaxis("GDP", [50, 50, 50], label_opts=LabelOpts(position="right"))
bar2.reversal_axis()

bar3 = Bar()
bar3.add_xaxis(["中国", "美国", "英国"])
bar3.add_yaxis("GDP", [70, 60, 60], label_opts=LabelOpts(position="right"))
bar3.reversal_axis()
```


#### 创建时间线对象

```python 
timeline = Timeline()
```


#### 在时间线内添加柱状图对象

```python
timeline.add(bar1, "点1")
timeline.add(bar2, "点2")
timeline.add(bar3, "点3")
```


#### 绘图

**注意: 这里用时间线去绘图, 而不是某一个柱状图**

```python
# 绘图
# 这里用时间线去绘图, 而不是某一个柱状图
timeline.render("基础时间线柱状图.html")
```


效果 


> 📷 *（此处原笔记附有本地运行示意图）*


#### 设置自动播放 

```python
timeline.add_schema( 
    # 自动播放的时间间隔, 1000毫秒
    play_interval= 1000, 
    # 是否在自动播放的时候显示时间线
    is_timeline_show= True, 
    # 是否自动播放
    is_auto_play= True, 
    # 是否循环播放 
    is_loop_play= True
)
```


#### 设置主题

要实现主题设置需要导 ThemeType 包

```python
from pyecharts.globals import ThemeType
```

然后只需要在创建时间线对象的时候传入主题参数  


```python
timeline = Timeline(
    {"theme": ThemeType.LIGHT}
)
```

各种主题如下: 

| 编号                     | 颜色    | 备注                         |
| ------------------------ | ------- | ---------------------------- |
| ThemeType.WHITE          | 红蓝    | 默认颜色等同于 bar = Bar（） |
| ThemeType.LIGHT          | 蓝黄粉  | 高亮颜色                     |
| ThemeType.DARK           | 红蓝    | 黑色背景                     |
| ThemeType.CHALK          | 红蓝 绿 | 黑色背景                     |
| ThemeType.ESSOS          | 红黄    | 暖色系                       |
| ThemeType.INFOGRAPHIC    | 红蓝黄  | 偏亮                         |
| ThemeType.MACARONS       | 紫绿    |                              |
| ThemeType.PURPLE_PASSION | 粉紫    | 灰色背景                     |
| ThemeType.ROMA           | 红黑灰  | 偏暗                         |
| ThemeType.ROMANTIC       | 红粉蓝  | 淡黄色背景                   |
