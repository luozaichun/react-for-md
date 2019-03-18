# react-for-md


[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/react-for-md.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-for-md

**react-for-md** ：A configurable markdown editor (component), based on React & [md-plus](https://github.com/luozaichun/md-plus).

## Features

- ✔︎ Based on React , A configurable markdown editor (component);
- ✔︎ Support Standard Markdown / CommonMark and GFM (GitHub Flavored Markdown);
- ✔︎ Real-time Preview;
- ✔︎ Image upload;
- ✔︎ Preformatted text/Code blocks insert;
- ✔︎ Read only, Dark-themes, Code syntax highlighting;
- ✔︎ Markdown Extras(Base on md-plus module): Support TOC (Table of Contents);
- ✔︎ Support CMD Module Loader, and Custom/define editor plugins;
- ✔︎ Support coaxial scrolling
  
![alt](https://raw.githubusercontent.com/wiki/luozaichun/react-for-md/screenshoot.png)

## Download & install

[Github download](https://github.com/luozaichun/react-for-md/archive/master.zip)

### install
```bash
$ npm install react-for-md 
```

## Usages

HTML：

```html
 <link href="/dist/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
 <link href="/dist/css/react-markdown.min.css" rel="stylesheet">
 <div id="app"></div>
```
javascript:

```html
<script src="react.js"></script>
<script src="react-dom.js"></script>
<script src="react-markdown.min.js"></script>
<script type="text/javascript">
    var editor = new Editor('app',{
        /*
          // or you can custom image upload route and publish form route.
 
           upload_route:"/upload",
           publish_route:"/",
 
         // or you can custom the editor container size.
 
           width: "100%",
           height: "100%",
 
         // or you can custom toolbar.
 
            toolbars:[
               {
                   name: "image",
                   title:"图片",
                   toolbarIcon:"fa-picture-o"
               },
               {
                   name: "H1",
                   title:"H1",
                   toolbarText:"H1"
               },
               {
                   name: "test",
                   title:"test",
                   toolbarIcon:"fa-user-circle-o",
                   //custom eventHandlers:
                   toolbarHandlers:function (_this) {
                        return _this.shortCutText("**加粗文字**", 2, 6)
                   }
               }
           ]
        */
    })
</script>
```

## License

[MIT](LICENSE)
