# Docker 部署指南

本文档说明如何使用 Docker 部署 Kintaro Portfolio Clone。应用运行在容器内部的 `3000` 端口，默认映射到宿主机的 `3002` 端口。

## 1. 环境要求

- Docker Engine 24 或更高版本
- Docker Compose v2
- 至少 1 GB 可用内存
- 首次构建需要连接 Docker Hub 和 npm registry

确认环境：

```bash
docker --version
docker compose version
```

## 2. 首次部署

进入项目目录：

```bash
cd "/Users/caden/Documents/ChatGPT/随机/xkintaro-clone"
```

构建镜像并在后台启动：

```bash
docker compose up -d --build
```

查看容器状态：

```bash
docker compose ps
```

正常情况下应显示：

```text
xkintaro-clone   Up   0.0.0.0:3002->3000/tcp
```

访问地址：

- 首页：<http://localhost:3002>
- 英文页面：<http://localhost:3002/en>
- TR 页面：<http://localhost:3002/tr>

验证 HTTP 状态：

```bash
curl -I http://localhost:3002/en
```

返回 `HTTP/1.1 200 OK` 表示部署成功。

## 3. 更换宿主机端口

容器内部端口固定为 `3000`。通过 `HOST_PORT` 修改宿主机端口，例如使用 `8080`：

```bash
HOST_PORT=8080 docker compose up -d --build
```

访问：

```text
http://localhost:8080/en
```

也可以创建 `.env` 文件：

```env
HOST_PORT=8080
```

之后直接运行：

```bash
docker compose up -d --build
```

## 4. 常用维护命令

查看运行状态：

```bash
docker compose ps
```

查看实时日志：

```bash
docker compose logs -f xkintaro
```

查看最近 100 行日志：

```bash
docker compose logs --tail=100 xkintaro
```

重启服务：

```bash
docker compose restart xkintaro
```

停止并移除容器：

```bash
docker compose down
```

停止服务但保留容器：

```bash
docker compose stop
```

重新启动已停止的容器：

```bash
docker compose start
```

## 5. 更新部署

修改代码后重新构建并替换容器：

```bash
docker compose up -d --build
```

如果需要忽略构建缓存：

```bash
docker compose build --no-cache
docker compose up -d
```

更新后确认状态和日志：

```bash
docker compose ps
docker compose logs --tail=50 xkintaro
curl -I http://localhost:3002/en
```

## 6. 生产服务器部署

将整个项目目录上传或克隆到服务器，然后执行：

```bash
cd xkintaro-clone
docker compose up -d --build
```

如果服务器使用 Nginx 反向代理，建议只监听本机地址。将 `docker-compose.yml` 中的端口配置改为：

```yaml
ports:
  - "127.0.0.1:${HOST_PORT:-3002}:3000"
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

修改配置后检查并重新加载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

生产环境建议同时配置 HTTPS、防火墙和定期镜像清理。

## 7. 故障排查

### 端口被占用

错误示例：

```text
bind: address already in use
```

换一个端口启动：

```bash
HOST_PORT=8080 docker compose up -d
```

### 页面无法访问

依次检查：

```bash
docker compose ps
docker compose logs --tail=100 xkintaro
curl -I http://localhost:3002/en
```

### 构建失败

重新构建并显示完整日志：

```bash
docker compose build --no-cache --progress=plain
```

### 容器反复重启

查看退出原因：

```bash
docker inspect xkintaro-clone --format='{{.State.Status}} {{.State.ExitCode}} {{.State.Error}}'
docker compose logs --tail=200 xkintaro
```

### 清理旧镜像

先查看磁盘占用：

```bash
docker system df
```

只清理未被使用的镜像：

```bash
docker image prune
```

## 8. 部署结构

- `Dockerfile`：多阶段构建 Next.js standalone 镜像
- `docker-compose.yml`：容器、端口和重启策略
- `.dockerignore`：排除本地依赖和构建缓存
- `next.config.mjs`：启用 Next.js standalone 输出

容器以非 root 用户 `nextjs` 运行，并配置了 `restart: unless-stopped` 自动重启策略。
