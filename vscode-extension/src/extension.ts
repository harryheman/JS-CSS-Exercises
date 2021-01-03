import * as vscode from 'vscode'

const fs = require('fs-extra')
const path = require('path')

import indexHTML from './components/index.html.js'
import styleCSS from './components/style.css.js'
import scriptJS from './components/script.js'
import iconPNG from './components/icon.png.js'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "template" is now active!')

  let disposable = vscode.commands.registerCommand('template.create', () => {
    const folder = (filename: string) =>
      path.join(vscode.workspace.rootPath, `${filename}`)

    const files: string[] = [indexHTML, styleCSS, scriptJS, iconPNG]

    const fileNames: string[] = [
      'index.html',
      'style.css',
      'script.js',
      'icon.png'
    ]

    ;(async () => {
      try {
        for (let i = 0; i < files.length; i++) {
          if (fileNames[i].includes('png')) {
            await fs.outputFile(folder(fileNames[i]), files[i], 'base64')
          } else {
            await fs.outputFile(folder(fileNames[i]), files[i])
          }
        }

        return vscode.window.showInformationMessage(
          'All files created successfully'
        )
      } catch {
        return vscode.window.showErrorMessage('Failed to create files')
      }
    })()
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
