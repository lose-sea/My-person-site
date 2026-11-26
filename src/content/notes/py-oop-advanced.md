---
title: "Python 基础进阶：数据容器、面向对象、装饰器与生成器"
category: "python"
categoryLabel: "Python 学习"
subTag: "Python 基础"
date: "2026-08-22"
readTime: "8 分钟"
summary: "整理类与对象封装、常用设计模式以及迭代器、生成器与装饰器的工程写法。"
csdnUrl: "https://github.com/lose-sea/python_learning"
featured: false
---

# 面向过程编程

面向对象编程, 是许多编程语言都支持的一种编程思想

简单理解就是: 基于模板 (类) 去创建实体 (对象), 使用对象完成功能开发

### 核心思想:  

把一个需求分解成一系列要执行的步骤, 然后按照步骤执行这些任务 (关注的是流程, 步骤) 


对象可以理解为现实中具体的人/物在程序中的数字化身 (万物皆对象) 

它把一个人/物的属性和方法打包到一起, 是面向对象编程的基本单元

### 面向对象三大特性:

+ 封装
+ 继承
+ 多态 

## 封装

封装表示将现实世界事物的 属性 和 行为封装到类中, 描述为成员变量, 成员方法, 从而完成程序对现实世界事物的描述  

类中提供了私有成员变量 和 私有成员方法 

定义私有成员的方法:   

私有成员变量: 变量名以`__`开头 (2个下划线)

私有成员方法: 方法名以`__` 开头(2个下划线) 

私有方法无法直接被类对象使用, 私有变量无法赋值, 也无法获取值  


```python
class Phone:
    __current_voltage = None

    def __keep_core(self):
        print("单核模式运行")

phone = Phone()
# 以下代码均报错
phone.current_voltage = 10 
phone.__keep_core()
```


```python
class Phone:
    __current_voltage = None

    def __keep_core(self):
        print("单核模式运行")

    def get_current_voltage(self):
        self.__current_voltage = 10
        print(self.__current_voltage)
        self.__keep_core()

phone = Phone()

phone.get_current_voltage()
```

私有成员和私有方法类对象无法直接使用, 但是类内部的其他成员是可以正常使用的 

私有成员是在类中提供仅内部使用的属性和方法, 而不对外开放(类对象无法使用)

## 继承

继承表示: **从父类那里继承 (复制) 来成员变量和成员方法 (不包含私有)** 

**继承分为单继承和多继承**

#### 单继承

语法: 

```python
class 类名(父类名): 
    类内容体
```


```python
class Phone:
    id = None
    product = "HM"
    def call(self):
        print("4G")

class Phone1(Phone):
    face_id = 2026
    def call_new(self):
        print("5G")

phone = Phone1()
print(phone.product)
phone.call()
phone.call_new()
```

#### 多继承

语法: 

```python
class 类名(父类1, 父类2, ......, 父类N): 
    类内容体
```


### 复写

子类继承父类的成员属性和成员方法后, 如果对其不满意, 可以进行复写 

即子类中重新定义同名的属性或方法 


```python
class Father:
    def say(self):
        print("father")

class Son (Father):
    def say(self):
        print("son")

son = Son()
son.say() # son
```


调用父类同名成员, 那么类对象调用成员的时候, 就会调用复写后的新成员

如果需要使用被复写的父亲的成员, 就需要特殊的调用方式

方式一:  

调用父类成员

+ 使用成员变量: 父亲名.成员变量
+ 使用成员方法: 父亲名.成员方法(self) 

方式二: 

使用 super() 调用父类成员

+ 使用成员变量: super().成员变量
+ 使用成员方法: super().成员方法() 

```python
class Father:
    name = 'Father'
    def say(self):
        print("I am father")

class Son (Father):
    name = 'Son'
    def say(self):
        print("I am son")
        print(self.name)
        print(super().name)

    def test(self):
        Father.say(self)
        super().say()

son = Son()
son.say() # son
son.test()
```

打印: 

```python
I am son
Son
Father
I am father
I am father
```

只可以在子类内部调用父类的同名成员, 子类的实体类对象调用默认是调用子类复写的 


## 多态

多态指的是: 多种状态, 即完成某个行为时, 使用不同的对象会得到不同的状态 

```python
class Animal:
    def speak(self):
        pass
class Dog(Animal):
    def speak(self):
        print("I am dog.")
class Cat(Animal):
    def speak(self):
        print("I am cat.")

def make_noise(animal: Animal):
    animal.speak()


dog = Dog()
cat = Cat()
make_noise(dog) # I am dog.
make_noise(cat) # I am dog.
```

**同样的行为(函数), 传入不同的对象, 得到不同的状态** 

多态常作用在继承关系上

比如: 

+ 函数(方法) 形参声明接受父类对象
+ 实际传入父类的子类对象进行工作

即: 

+ 以父类做定义声明
+ 以子类做实际工作
+ 用以获得同一行为, 不同状态 

上面的例子中, 父类的speak方法是空实现

```python
class Animal:
    def speak(self):
        pass`
```

这种设计的含义是: 

+ 父类用来确定有那些方法
+ 具体的方法实现, 由子类自行决定

这种写法, 就叫做抽象类 (也可以称之为接口) 

> 抽象类: 含有抽象方法的类称之为抽象类
>
> 抽象方法: 方法体是空实现的 (pass) 称之为抽象方法

---

# 装饰器

装饰器本质上是一种闭包, 其功能就是在不**破坏目标函数原有的代码和功能**的前提下, **为目标函数增加新功能**. 

函数拥有一下特点: 

1. 函数可以作为参数进行传递
2. 函数可以作为返回值进行返回
3. 函数名称可以当成变量一样进行赋值操作


现在有一个 sleep 函数

```python
def sleep(): 
    import random
    import time 
    print("sleeping")
    time.sleep(random.randint(1, 5))
```

现在希望给 sleep 函数增加一个新功能: 

+ 在调用 sleep 前输出: `I will sleep` 
+ 在调用 sleep 后输出: `I wake`

有下面的代码: 

```python
print("I will sleep")
sleep() 
print("I wake")
```

但是这样的方式非常的不优雅,那有没有其他方式呢, 有的, 可以使用 装饰器来实现


### 装饰器的一般写法 (闭包写法)


```python
def sleep():
    import random
    import time
    print("sleeping")
    time.sleep(random.randint(1, 5))

def outer(func):
    def inner():
        print("I will sleep")
        func()
        print("I wake")
    return inner

fn = outer(sleep)
fn()
```


### 装饰器的语法糖写法


```python
def outer(func):
    def inner():
        print("I will sleep")
        func()
        print("I wake")
    return inner

@outer
def sleep():
    import random
    import time
    print("sleeping ...")
    time.sleep(random.randint(1, 5))

sleep() 
```

使用@outer, 定义在目标函数之上

这种写法与装饰器的一般写法的调用方式以一样的, 这里调用 `sleep()` , 本质上调用的还是 `inner()` 


## 装饰器带参数

先给出无参形式的代码

```python
def outer(func):
    def inner():
        print("start")
        func()
        print("end")
    return inner


@outer
def sleep(time):
    print("sleeping")

sleep()
```


现在要给上述的`sleep`函数添加一个参数 

```python
def sleep(time):
    print(f"sleeping, time: {time}")
```

那么再按照原来的方式调用就会报错

```python
def outer(func):
    def inner():
        print("start")
        func()
        print("end")
    return inner

@outer
def sleep(time):
    print(f"sleeping, time: {time}")

sleep(45)
```


上述代码中`@outer` 等价于 `sleep = outer(sleep)`, 实际上就是调用 `inner() `

当`@outer`装饰`sleep`函数时，`outer(sleep)`返回的是`inner`函数，而`inner`没有参数，导致调用`sleep()`时无法传递`time`参数。

解决方法: 在`inner`函数中添加`*args, **kwargs`来接收任意参数，并传递给`func`

```python
def outer(func):
    def inner(*args, **kwargs):
        print("start")
        func(*args, **kwargs)
        print("end")
    return inner


@outer
def sleep(time):
    print(f"sleeping, time: {time}")


sleep(32)
```

输出: 

```python
start
sleeping, time: 32
end
```

## 装饰器之原函数带返回值

下面要演示原函数带返回值

下面函数返回值并且要打印返回值

```python
def sleep(time):
    print(f"sleeping, time: {time}")
    return "wake"

print(sleep(1)) # wake
```

那么现在要给这个函数添加一个装饰器 

只需要在装饰器内部用一个变量接收返回值并且内部的`inner()`返回这个返回值即可

```python
def outer(func):
    def inner(*args, **kwargs):
        print("start")
        ret = func(*args, **kwargs)
        print("end") 
        return ret
    return inner


@outer
def sleep(time):
    print(f"sleeping, time: {time}")
    return "wake"

print(sleep(1))
```


### 一个函数可以被多个装饰器装饰

```python
def wrapper1(func):
    def inner(*args,**kwargs):
        print("in wrapper1")
        func(*args,**kwargs)
        print("out wrapper1")
    return inner

def wrapper2(func):
    def inner(*args,**kwargs):
        print("in wrapper2")
        func(*args,**kwargs)
        print("out wrapper2")
    return inner


@wrapper1
@wrapper2
def target():
    print("in target")


target() 
```


打印: 

```python
in wrapper1
in wrapper2
in target
out wrapper2
out wrapper1
```


 **装饰器的执行顺序是从下往上**


```python
@wrapper1
@wrapper2
def target():
    print("in target")
```


**等价于**：

```
target = wrapper1(wrapper2(target))
```

**执行步骤**：

1. **装饰阶段**（定义时）：

   - `@wrapper2` 先执行：`target = wrapper2(target)` → `target` 变成 `wrapper2` 的 `inner`
   - `@wrapper1` 后执行：`target = wrapper1(已装饰的target)` → `target` 变成 `wrapper1` 的 `inner`

2. **调用阶段**（`target()` 时）：

   ```
   wrapper1.inner() 开始
   ├── 打印 "in wrapper1"
   ├── 调用 func() → 这个 func 是 wrapper2.inner()
   │   ├── 打印 "in wrapper2"
   │   ├── 调用 func() → 这个 func 是原始的 target()
   │   │   └── 打印 "in target"
   │   └── 打印 "out wrapper2"
   └── 打印 "out wrapper1"
   ```


## 通用装饰器的写法:

```python
def wrapper(fn):
    def wrapper(*args, **kwargs):
        # 目标函数执行之前 ...
        ret = fn(*args, **kwargs)
        # 目标函数执行之后 ...
        return ret
    return wrapper # 不加()


@wrapper
def target(*args, **kwargs):
    pass
```

这里添加装饰器之后再调用目标函数 `target()`, 实际上就是调用 `inner() `
