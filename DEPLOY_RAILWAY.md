# Railway 部署指南

本指南将帮助您将 NeuroFlow 应用部署到 Railway 平台，支持两种部署方式：网页界面和 CLI 命令行。

## 准备工作

1. 确保您已经构建了项目，`dist` 目录包含以下文件：
   - `index.html` - 应用入口文件
   - `assets/index-CB7PtsAY.js` - 打包后的 JavaScript 文件

2. 拥有一个 Railway 账号，如果没有请先注册：[Railway官网](https://railway.app/)

3. （可选）如果使用 CLI 部署，需要安装 Railway CLI（见下文）

## 方法一：网页界面部署（推荐，无需安装CLI）

### 1. 登录 Railway

访问 [Railway 控制台](https://railway.app/dashboard) 并使用 GitHub 账号登录。

### 2. 创建新项目

1. 点击控制台右上角的「New Project」按钮
2. 选择「Deploy from GitHub repo」选项
3. 授权 Railway 访问您的 GitHub 仓库
4. 选择包含 NeuroFlow 代码的 GitHub 仓库
5. 点击「Deploy Now」按钮

### 3. 配置构建设置

1. 部署开始后，点击「Settings」标签页
2. 选择「Build Settings」部分
3. 配置以下选项：
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`
   - **Output Directory**: `dist`
4. 点击「Save Changes」按钮

### 4. 等待部署完成

1. 点击「Deployments」标签页
2. 等待部署状态变为「Success」
3. 点击「View Logs」可以查看详细的部署日志

### 5. 访问网站

1. 部署成功后，点击「Settings」标签页
2. 选择「Domains」部分
3. 复制 Railway 提供的默认域名（如 `neuroflow-production-xxxx.up.railway.app`）
4. 在浏览器中访问该域名，即可看到您的应用

## 方法二：CLI 命令行部署

### 1. 安装 Railway CLI

使用 npm 全局安装 Railway CLI：

```bash
npm install -g @railway/cli
```

### 2. 登录 Railway

在终端中执行以下命令登录：

```bash
railway login
```

按照提示在浏览器中授权登录。

### 3. 初始化项目

在项目根目录执行以下命令：

```bash
railway init
```

按照提示选择或创建一个新项目。

### 4. 部署项目

执行以下命令部署项目：

```bash
railway up
```

等待部署完成，命令会显示部署状态和访问域名。

### 5. 查看部署状态

执行以下命令查看部署日志：

```bash
railway logs
```

## 部署更新

### 网页界面更新

1. 将代码推送到 GitHub 仓库
2. Railway 会自动检测到代码变更并触发新的部署
3. 等待部署完成后，即可访问更新后的应用

### CLI 更新

在项目根目录执行以下命令：

```bash
railway up
```

## 配置环境变量（可选）

如果您的应用需要环境变量，可以在 Railway 控制台中配置：

1. 点击「Settings」标签页
2. 选择「Environment Variables」部分
3. 点击「Add Variable」按钮添加环境变量
4. 环境变量会在下次部署时自动应用

## 注意事项

1. Railway 免费计划有资源限制，适合开发和测试使用
2. 部署完成后，Railway 会提供一个免费的临时域名
3. 可以绑定自定义域名（需要在 Railway 控制台中配置）
4. 单页应用需要确保所有路由都指向 `index.html`，Railway 默认支持这一特性

## 常见问题

### 部署失败怎么办？

1. 检查构建日志，查看具体错误信息
2. 确保项目可以在本地正常构建（执行 `npm run build` 命令）
3. 检查依赖是否安装正确（执行 `npm install` 命令）
4. 确保 `railway.json` 配置文件正确

### 如何绑定自定义域名？

1. 点击「Settings」标签页
2. 选择「Domains」部分
3. 点击「Add Domain」按钮
4. 输入您的自定义域名
5. 按照提示完成域名解析配置
6. 等待域名验证通过后，即可通过自定义域名访问网站

祝您部署顺利！
