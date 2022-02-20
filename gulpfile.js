const { src, dest, series } = require('gulp')
const del = require('del')

const { log } = console

const doc = './src/apollo/document/**.d.ts'

function moveDocument () {
  return src(doc, { base: './' }).pipe(dest('__generated__/@types/doc'))
}

function remove() {
  return del([doc])
}

exports.default = series(moveDocument, remove)
