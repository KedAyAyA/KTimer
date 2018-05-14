# KTimer

一种集中式管理定时递归的轻量级解决方案

## 出发点

1. 抽离项目中随意的定时递归代码，专心于业务而不用思考递归逻辑

2. 集中式管理，可在跨组件等不同代码位置使用同一个定时器

## 安装

```
npm install ktimer
```

## Example

```javascript
// 每隔1秒(理想状态)调用callback函数
var ktimer1 = new KTimer('timer-1', {
  callback: function () {
    // do something
  },
  delay: 1000
})
```

更多示例请 clone 代码后 ```npm install && npm run example``` 查看

## API

- 构造函数

  KTimer (name: string,[options: obj])

  - options

    - data: 可选 内部状态的初始值，会在内部保存一个副本，在计时或跨组件等获取状态时很有用

    - callback: 每个计时周期执行的函数

    - delay: 每个计时周期的时长

    - changeDataFn: 每个周期时长用来修改data的回调方法，参数为当前data的值，返回值如果为基本类型会直接赋值给data，每个周期先于callback调用，默认绑定this到当前计时器实例

  > important: 全局唯一name对应唯一实例，只要名字相同，通过new Ktimer创建的实例都是最早创建的相同名称的实例。
- 静态方法

  - getInstanceByName
    
    获取对应名称的定时器实例
    - 参数: name: string
    - 返回值: 获取传入name为key的定时器实例，若不存在返回undefined
    - 用法
      ```javascript
      var ktimer = KTimer.getInstanceByName('ktimer')
      ```

  - removeInstance

    移除对应名称或实例的定时器实例
    - 参数: symbol: string|object
    - 返回值: undefined
    - 用法
      ```javascript
      KTimer.removeInstance('ktimer')
      ```

- 实例方法

  - ktimer.start

    开启一个定时器的计时回调
    - 参数: [context: any (执行回调函数的上下文，一些情况下非常有用)]
    - 返回值: ktimer
    - 用法
      ```javscript
      ktimer.start()
      ```

  - ktimer.stop

    停止一个定时器的计时回调
    - 参数: 无
    - 返回值: ktimer
    - 用法
      ```javascript
      ktimer.stop()
      ```

  - ktimer.setData

    设置当前实例的data
    - 参数: any
    - 返回值: ktimer
    - 用法
      ```
      ktimer.setData(1)
      ```
  
  - ktimer.getData

    获取当前实例的data
    - 参数: 无
    - 返回值: 当前实例的data
    - 用法
      ```
      var data = ktimer.getData()
      ```

  - ktimer.reset

    重置当前的状态
    - 参数: (context: any, [data: any]) context为callback执行时的this, data为想要重置时设置的data, 默认为初始传入options的data
    - 返回值: ktimer
    - 用法
      ```javascript
      ktimer.reset(null, 1)
      ```
    - tips: reset方法会停止计时，并重置data，这在一些时候会有用
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright © 2018-present, [KedAyAyA](https://github.com/KedAyAyA)