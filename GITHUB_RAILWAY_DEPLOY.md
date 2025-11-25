# GitHub + Railway 部署指南

## 前提条件

1. 您已经登录了 [Railway](https://railway.app/) 账号
2. 您已经登录了 [GitHub](https://github.com/) 账号
3. 本地项目已经初始化了 git 仓库（已完成）
4. 本地项目已经完成初始提交（已完成）

## 步骤 1：在 GitHub 上创建新仓库

1. 打开 [GitHub 新建仓库页面](https://github.com/new)
2. 填写仓库信息：
   - **仓库名称**：输入一个名称（如 `neuroflow`）
   - **仓库描述**：（可选）输入项目描述
   - **仓库类型**：选择「Public」或「Private」
   - **初始化设置**：**不要勾选**任何初始化选项（不要创建 README、.gitignore 或 LICENSE）
3. 点击「Create repository」按钮创建仓库

## 步骤 2：将本地仓库与 GitHub 仓库关联

1. 在 GitHub 仓库页面，复制「Quick setup」下的 HTTPS 或 SSH 地址（如 `https://github.com/your-username/neuroflow.git`）
2. 打开本地项目终端（已在项目目录）
3. 执行以下命令（将 `your-username` 替换为您的 GitHub 用户名，`neuroflow` 替换为您的仓库名称）：

   ```bash
   git remote add origin https://github.com/your-username/neuroflow.git
   ```

4. 执行以下命令将本地分支重命名为 `main`（如果不是的话）：

   ```bash
   git branch -M main
   ```

## 步骤 3：将代码推送到 GitHub

执行以下命令将本地代码推送到 GitHub：

```bash
git push -u origin main
```

输入您的 GitHub 用户名和密码（或个人访问令牌）进行验证。

## 步骤 4：从 Railway 部署

1. 打开 [Railway 控制台](https://railway.app/dashboard)
2. 点击右上角的「New Project」按钮
3. 选择「Deploy from GitHub repo」选项
4. 在「Select a GitHub repository」下拉菜单中，选择您刚创建的 `neuroflow` 仓库
5. 点击「Deploy Now」按钮开始部署
6. 部署开始后，Railway 会自动：
   - 克隆 GitHub 仓库
   - 安装依赖
   - 执行构建命令 `npm run build`
   - 启动应用 `npm run preview`
7. 等待部署完成（通常需要 1-2 分钟）

## 步骤 5：访问部署的应用

1. 部署完成后，点击「View Deployment」按钮
2. 或在「Settings」→「Domains」中找到 Railway 提供的默认域名
3. 在浏览器中访问该域名，即可看到您的应用

## 后续更新流程

1. 在本地修改代码
2. 提交代码到本地 git 仓库：
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
3. 推送到 GitHub：
   ```bash
   git push
   ```
4. Railway 会自动检测到代码变更并触发新的部署
5. 等待部署完成后，即可访问更新后的应用

## 常见问题

### 无法在 Railway 中看到我的 GitHub 仓库？

1. 确保您已经授权 Railway 访问您的 GitHub 仓库
2. 刷新 Railway 页面，重新尝试选择仓库
3. 检查 GitHub 仓库是否为公共仓库（私有仓库需要额外配置）

### 部署失败怎么办？

1. 点击「Deployments」标签页，查看部署日志
2. 检查是否有构建错误或依赖安装失败
3. 确保本地可以正常构建：执行 `npm run build`
4. 检查 `railway.json` 配置是否正确

### 如何配置环境变量？

1. 在 Railway 控制台，点击「Settings」标签页
2. 选择「Environment Variables」部分
3. 点击「Add Variable」按钮添加环境变量
4. 环境变量会在下次部署时自动应用

## 联系方式

如果您在部署过程中遇到任何问题，可以参考：
- [Railway 文档](https://docs.railway.app/)
- [GitHub 文档](https://docs.github.com/)

祝您部署顺利！
