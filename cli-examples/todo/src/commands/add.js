const { Command } = require('@oclif/command')
const { Todo } = require('../db')
const chalk = require('chalk')

class AddCommand extends Command {
  async run() {
    const { argv } = this.parse(AddCommand)
    try {
      await Todo.push({
        id: Todo.value().length,
        task: argv.join(' '),
        done: false,
      }).write()
      this.log(chalk.green('New todo created.'))
    } catch {
      this.log(chalk.red('Operation failed.'))
    }
  }
}

AddCommand.description = `Adds a new todo`

AddCommand.strict = false

module.exports = AddCommand
