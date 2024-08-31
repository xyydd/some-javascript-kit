tar xzvf openssl-1.1.1t.tar &&
cd openssl-1.1.1t &&
./config shared zlib &&
make &&
make install &&
mkdir /usr/local/ssl/.openssl &&
cp -r include /usr/local/ssl/.openssl/ &&
cp -r /usr/local/lib64 /usr/local/ssl/.openssl &&
cd /usr/local/ssl/.openssl && mv lib64 lib &&
