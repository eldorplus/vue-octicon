var fs = require('fs')
var path = require('path')
var icons = require('octicons')

var moduleTpl = fs.readFileSync(path.resolve(__dirname, './icon.tpl'), 'utf8')
var ICON_PATH = path.resolve(__dirname, '../src/icons')

var indexModule = ''
var names = Object.keys(icons)
names.forEach(function (name) {
    var data = {}
    var icon = icons[name]
    let iconData = data[name] = {}
    iconData.width = parseFloat(icon.width)
    iconData.height = parseFloat(icon.height)
    iconData.d = icon.path.match(/\bd="([^"]+)"/)[1]

    fs.writeFileSync(ICON_PATH + '/' + name + '.js', moduleTpl.replace('${icon}', JSON.stringify(data)))
    indexModule += 'import \'./' + name + '\'\n'
})

fs.writeFileSync(ICON_PATH + '/index.js', indexModule)
console.log(names.length + ' icon modules generated.')
