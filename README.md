# react-for-md

[![NPM version][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/conso.svg?style=flat-square
[npm-url]: https://https://www.npmjs.com/package/react-for-md

**react-for-md**:A configurable markdown editor (component), based on React & Marked(md-plus).

## Features

- ✔︎ Based on React , A configurable markdown editor (component);
- ✔︎ Support Standard Markdown / CommonMark and GFM (GitHub Flavored Markdown);
- ✔︎ Real-time Preview;
- ✔︎ Image (cross-domain) upload;
- ✔︎ Preformatted text/Code blocks insert;
- ✔︎ Read only, Dark-themes, Code syntax highlighting;
- ✔︎ Markdown Extras(Base on md-plus module): Support TOC (Table of Contents);
- ✔︎ Support CMD Module Loader, and Custom/define editor plugins;

## Download & install

[Github download](https://github.com/luozaichun/react-for-md.git)

### install
```bash
$ npm install react-for-md 
```

## Example

you can mapping `http://localhost:3000/home/user/:uid` via code below

```javascript
let {Annotation} = require('conso');
let UserModel = require('../model/UserModel');

let {route, get, model} = Annotation;

@route('/home')
class index {

    @model(UserModel)
    user;

    @get('/user/:uid')
    async homePage(ctx, next) {
        let _user = await this.user.findOne({uid: ctx.params.id});
        // await ctx.render('index', {user:_user});
        ctx.json({user:_user});
    }
}

```

## Quick Start

> conso has a built-in generator which you can use that to generate an application as shown below:

 - Install the executable.

```bash
$ npm install -g conso
```

 - Create the app:
 
```bash
$ conso init showcase && cd showcase
```

 - Install dependencies:
  
```bash
$ npm install
```
  
 - Start the server:
  
```bash
$ npm start
```

 Then Open `http://localhost:3000`

## Docs & Community

>This project uses JSDoc. For the full public API documentation, clone the repository and run npm run doc. This will run JSDoc with the proper options and output the documentation to out/.

Coming soon! Please expecting!


## License

[MIT](LICENSE)
