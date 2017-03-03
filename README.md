# sunny-builder
A tools for front-end workflow

**It is developing. Don't use it in large scale project. Welcome submit issues.**

The builder is based on [webpack](http://webpack.github.io). It contains a series of common plugins and loader and you can write *es2015* code directly. It can help you distinguish between `dev`, `build` and `dist` scene. It recommands you to use webpack in the whole development process. And you can use other webpack loaders and plugins without any districts. 

## Scene Concept

- dev: For development. The builder will watch your code, compile them when they are changed and then refresh the browser. 
- build: Package the project without compress and uglify.
- dist: For production. Package the project, compress the images and uglify the code.

## Install

install the builder in global.

It is based on [webpack2](https://github.com/webpack/webpack)

```
npm install -g sunny-builder@1.0.0-0
```

## Get Started

1. create a `sun.config.js` under the project root.

	```javascript
	var path = require('path');
	
	module.exports = {
	    webpack: {
	        entry: {
	            home: ['./public/modules/home/home.js']
	        },
	        output: {
	            path: path.join(__dirname, 'build'),
	            publicPath: ''
	        }
	    },
	    pageMap: [
	        {
	            chunks: ['home'],
	            template: './templates/views/index.twig',
	            filename: 'index.twig'
	        }
	    ]
	};
	
	```

2. Install dependencies.
	
	```
	sun install
	```
	
3. Start developing.
	
	```
	sun dev
	```
	


