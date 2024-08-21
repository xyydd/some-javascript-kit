# nginx 配置记录

## nginx 源码安装 包括openssl

1. 解压
2. 进入openssl源码目录
3. `./config shared zlib`
4. `make`
5. `sudo make install`
6. `mkdir /usr/local/ssl/.openssl`
7. `cp -r include /usr/local/ssl/.openssl/`
8. `cp -r /usr/local/lib64 /usr/local/ssl/.openssl`
9. `cd /usr/local/ssl/.openssl && mv lib64 lib`
9. 进入nginx源码目录
10. `./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-openssl=/usr/local/ssl`
11. `make`
12. `sudo make install`

步骤6、7、8、9是因为nginx配置openssl默认会从ssl文件夹内读取`.openssl`的内的`include`和`lib`目录，而ssl安装目录下没有`.openssl`文件夹，所以需要手动创建`。

但是也可以修改nginx源码包内`vi auto/lib/openssl/conf`,修改以下内容，其中include文件通常在openssl源码包内，而lib文件通常在`/usr/local/lib64`：
```shell
CORE_INCS="$CORE_INCS $OPENSSL/.openssl/include"
CORE_DEPS="$CORE_DEPS $OPENSSL/.openssl/include/openssl/ssl.h"
CORE_LIBS="$CORE_LIBS $OPENSSL/.openssl/lib/libssl.a"
CORE_LIBS="$CORE_LIBS $OPENSSL/.openssl/lib/libcrypto.a"
```
