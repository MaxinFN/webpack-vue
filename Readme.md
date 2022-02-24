<!--
 * @Author: your name
 * @Date: 2020-08-18 19:51:44
 * @LastEditTime: 2021-07-27 11:56:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \m\Readme.md
-->
## npm install
- npm install --save-dev / npm install -D (打包构建项目所需要的的依赖包)
 - xxx-cli , less-loader, babel-loader

- npm install --save / npm install -S (项目发布生产时运行必须要用的依赖包)
  - antd , element, react

## 代码提交规范
- 教程：
https://juejin.cn/post/6921223155621036039#heading-18
- 官方文档：
https://github.com/leoforfree/cz-customizable#steps

## 代码依赖库
- 日志库: npm install sn-console --save
```text
import log from 'sn-console''
window.log = log // 挂载window上，全局使用

let arr = [
            {
                name: 'SNine',
                age: 22
            },
            {
                name: '张三',
                age: 28
            }
          ]
  log.info(arr)
  log.success(arr)
  log.primary(arr)
  log.warning(arr)
  log.danger(arr)

```

## async/await 踩坑
- 项目中使用async/await 编译后爆出错误
```text
regeneratorRuntime is not defined
```
- 解决方法：
  - babel 6.x.x版本，npm i babel-plugin-transform-runtime -D
  - babel 7.x.x版本，npm i @babel/plugin-transform-runtime -D
  - 在babelrc
  ```js
  "plugins": [
    ["@babel/plugin-transform-runtime"]
  ]
  ```