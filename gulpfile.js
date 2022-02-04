const { src, dest, series } = require('gulp')
const del = require('del')

const { log } = console

const doc = './src/apollo/server/document/**.d.ts'
const type = './src/apollo/server/types/**.d.ts'

function moveDocument () {
  return src(doc, { base: './' }).pipe(dest('__generated__/@types/doc'))
}

function moveTypes () {
  return src(type, { base: './' }).pipe(dest('__generated__/@types/types'))
}

function remove() {
  return del([doc, type])
}

exports.default = series(moveDocument, moveTypes, remove)
