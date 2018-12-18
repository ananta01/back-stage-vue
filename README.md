# 电费在线管理系统（客户端）

## Project setup
```
npm install
and
github back-stage-vue-server(服务器端)
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 项目介绍
##### 电费在线管理系统采用前后端分离的模式进行开发，前端技术栈（Vue全家桶 +　ElementUI）,后端技术栈（Node.js(express框架) + Mongodb数据库）。

## 项目模块
* 首页
* 用电查询
* 用电明细
* 帐号信息
* 用户留言
* 系统公告

##### 技术点
* 通信技术：采用AJAX进行前后端通信，利用Token令牌进行身份验证
* 权限划分：用户分为普通用户和管理员，利用前端实现简单的权限划分，管理员可以进行确认，修改，删除等操作。
