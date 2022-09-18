
module.exports = {
    settings:{
      workspace:'./.vscode/vetur/snippets'
    },
    projects: [
      {
        root: './client', // root of your vue project (should contain package.json)
        snippetFolder: '../.vscode/vetur/snippets',
        package: './package.json', // Relative to root property, don't change this.,
        jsconfig: './jsconfig.json', // Relative to root property, don't change this.,
        globalComponents: [
          './src/components/**/*.vue'
        ]
      }
      
    ]
  }