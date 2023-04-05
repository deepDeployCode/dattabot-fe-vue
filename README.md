**How to run this project**

1. install node js dan npm di local anda.
2. pastikan perintah dibawah ini jalan di local anda (tujuannya agar node js dan npm dapat berjalan 100% tidak ada kendala)


```Bash
1. node (version: node-v)
2. npm (version: npm -v)

```

3. setelah node js dan npm sudah berjalan di local anda kemudian lakukan perintah yang di bawah ini 

*dan perlu di ingat bahwa versi node js yang di butuhkan adalah: v16.3.2*

4. buka terminal atau cmd dan ketikan perintah dibawah ini :

## install dependancy:

```Bash
npm install

```
## jalankan server projectnya:

```Bash
npm run serve

```

5. setelah melakukan perintah yang ada di point ke-4 selanjutnya anda akan dihadapkan pada suatu output seperti dibawah ini: 


```Bash
local:https://localhost:8000
network:https://10.3.141.1:8080

```

yang artinya bahwa project tersebut sudah running/berjalan dengan baik selanjutnya tinggal membuka url tersebut di browser kesukaan anda

=================//====================================================//==========

**How to deploy to stagging**

1. jalankan perintah yang ada di bawah ini.

## deploy command:

```Bash
npm run build

```

2. buka filezilla.
3. connect ke server menggunakan credential yang sudah di berikan.
4. copy isi dari folder dist ke server stagging.
5. selesai.
