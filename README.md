## intro
this is an example usage of nextjs14 app router + cloudflare r2.

Cloudflare R2 offers cost-effective, high-performance, and secure storage for large unstructured data.

[r2 pricing](https://developers.cloudflare.com/r2/pricing)
![image](https://github.com/cyrus-cai/nextjs-cloudflare_r2/assets/91727456/20e43b45-30cf-411e-9659-c6ce1b7e201b)


## installation
```bash
# clone the repository
$ git clone git@github.com:cyrus-cai/nextjs-cloudflare_r2.git

# navigate to the project directory
cd nextjs-cloudflare_r2

# install dependencies
npm install

```

## config local variables
### create `.env.local` file
```bash
touch .env.local
```
### config `.env.local` file
> You can find id & keys @ https://dash.cloudflare.com/
```
//r2->overall->(right-top) account details->account id
R2_ACCOUNT_ID=

//r2->overall->(right-top) account details->manage r2 api tokens->create api token->(permissions Admin read & write)->create api token
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=

//r2 bucket name
R2_BUCKET_NAME=
```



## start
```bash
# start the development server
npm run dev

```
