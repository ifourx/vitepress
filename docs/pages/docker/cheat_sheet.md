# Dockerfile

[Dockerfile reference](https://docs.docker.com/reference/dockerfile/)

> [!TIP]
>
> 1. 使用多阶段的方式构建镜像。
> 2. 测试阶段建议使用多个 RUN，这样构建效率高点，测试完成后再把多个 run 命令合并。

> [!IMPORTANT]
>
> 镜像缓存问题。比如 git clone 最新代码时需要在 build 阶段加上 `--no-cache` 参数，不然不会重新 clone 代码(因为你的仓库名字是一样的，构建时 docker 认为这一层没变化，不会重新构建)

## 镜像保存与加载

保存

```sh
docker save <image_id> | gzip > myimage_latest.tar.gz
```

加载

```sh
docker load < myimage_latest.tar.gz
```

## 后台运行

不执行 container 中的 CMD 或 entrypoint,直接进入 container

没有 `sleep infinity` 用 `tail -f /dev/null`

```sh
docker run -d --name debian debian:stable /bin/sh -c "sleep infinity"

```

替代镜像中的 entrypoint 命令，并让镜像以守护态运行

```sh
docker run -d --name snell --entrypoint /bin/sh snelltest:1.0.0 -c "sleep infinity"

```

## CMD & ENTRYPOINT

使用 `exec form` 不要使用 `shell form`

```dockerfile
ENTRYPOINT ["/bin/bash", "-c", "echo hello"]
CMD ["sh", "-c", "echo $HOME"]
```

```dockerfile
ENTRYPOINT ["bin/rpc_server"]
CMD [ "--address=:14700" ]
```
