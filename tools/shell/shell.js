const shelljs = require('shelljs')
const clc = require('cli-color')
const { COLORS } = require('../constants')

//  -e: exit upon error
shelljs.set('-e')

const { cat, cp, exit, exec, env, rm, set, echo: nativeEcho, sed, mkdir } = shelljs

function execSilent(command) {
  const result = exec(command, { silent: true })
  return result.stdout.trim()
}

function echo(msg, color = COLORS.white) {
  if (COLORS[color]) {
    return nativeEcho(clc[color](msg))
  }

  return nativeEcho(clc.white(msg))
}

module.exports = { cat, cp, exit, exec, env, rm, set, echo, nativeEcho, execSilent, sed, mkdir }
