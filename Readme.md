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