const vscode = require('vscode')

function parseModelString(str) {
    let i,
        arr = [],
        re = /(\S+)\s*=\s*[^(]*\(([^)]*)\)/g

    while ((i = re.exec(str))) {
        arr.push(i[1])
    }

    return arr
}

function getCommands() {
    let clipboard
    return {
        copy: function() {
            const editor = vscode.window.activeTextEditor
            const selection = editor.selection
            clipboard = editor.document.getText(selection)
        },
        paste: function() {
            const editor = vscode.window.activeTextEditor
            const pos = editor.selection.active
            const arr = parseModelString(clipboard).map(str => `'${str}'`)

            if (arr.length) {
                editor.edit(edit => {
                    edit.insert(pos, `(${arr.join(', ')}, )`)
                })
            } else {
                vscode.window.showInformationMessage('No fields to paste')
            }
        }
    }
}

function activate(context) {
    const { copy, paste } = getCommands()

    const copyModelFields = vscode.commands.registerCommand(
        'extension.copyModelFields',
        copy
    )

    const pasteModelFields = vscode.commands.registerCommand(
        'extension.pasteModelFields',
        paste
    )

    context.subscriptions.push(copyModelFields)
    context.subscriptions.push(pasteModelFields)
}
exports.activate = activate
exports.parseModelString = parseModelString
