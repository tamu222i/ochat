Dockerを使った実行環境
====================

# 構築手順
Dockerfileを使います。

## 概要
CentOS7のイメージへ，Meteor.jsの実行環境と，ochatのソースをGithubからクローンして実行します。

## テスト環境
OS: MacOS X Maverics 10.9.4
VirtualBox
Boot2docker v1.1.2
docker 1.1.2

## 利用手順
※上記のdockerを実行するための環境は構築済みのものとして記載します。

1. Dockerイメージの作成
```
docker build -t ochat/meteor .
```
ochat/meteorの箇所は好きな名前をつけてもOKです。

終了後，以下のコマンドを実行してochat/meteorのイメージ(REPOSITORYの箇所の記載)があれば完成です。
```
docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ochat/meteor        latest              ed1d368399f7        2 days ago          639.2 MB
centos              centos7             b157b77b1a65        3 weeks ago         243.7 MB
```

2. Dockerイメージの実行
```
docker run -d -p 3000:3000 -i -t ochat/meteor
```
しばらくすると，「=> App running at: http://localhost:3000/」と表示されます。
この状態でDockerを動かしているホストマシンのURLへWebブラウザで接続すればochatの画面を見られます。

URL: http://[ip address]:3000/
※ポート番号はデフォルトで3000番です。
※[ip address]の箇所は，boot2dockerの場合はboot2docker ipで調べられます。

3. Dockerイメージの実行を停止する
以下のコマンドを実行して，実行中のコンテナのCONTAINER IDを調べます。
```
docker ps -a
CONTAINER ID        IMAGE                 COMMAND                CREATED             STATUS              PORTS                    NAMES
057acbc742fe        ochat/meteor:latest   /bin/sh -c /usr/loca   2 days ago          Up 22 minutes       0.0.0.0:3000->3000/tcp   suspicious_franklin
```
この実行結果から，CONTAINER IDが「057acbc742fe」であることがわかります。
このCONTAINER IDを指定してコンテナを終了させます。

```
docker kill 057acbc742fe
```
再度docker ps -a を実行すると，先ほど表示されたコンテナが削除されていることがわかるはずです。

以上


