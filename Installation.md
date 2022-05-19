
# npm init -y
Initialise package.json

# npm i webpack webpack-cli --save-dev
Install webpack: take source js and transpile it into one js file

# npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
Install babel: transpile code that is compatible with browsers

# npm i react react-dom --save-dev
Install react

# npm install @material-ui/core
Install built-in components for user interface

# npm install @babel/plugin-proposal-class-properties
To use async and await in javascript code

# npm install react-router-dom
Go to two different pages in react app

# npm install @material-ui/icons

# Create babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}

Set up the above

# Create webpack.config.js
Determine entry point to be index.js
Determine output to be a given filename

# Add to package.json
"dev": "webpack --mode development --watch",
"build": "webpack --mode production" 

Keep reloading