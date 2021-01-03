const { Command } = require('@oclif/command')
const Todo = require('../db')
const chalk = require('chalk')

class RemoveCommand extends Command {
  async run() {
    const { id } = this.parse(RemoveCommand).args
    try {
      await Todo.remove({ id: parseInt(id, 10) }).write()
      this.log(chalk.green('Todo removed.'))
    } catch {
      this.log(chalk.red('Operation failed.'))
    }
  }
}

RemoveCommand.description = `Removes a task by id`

RemoveCommand.args = [
  {
    name: 'id',
    description: 'todo id',
    required: true
  }
]

module.exports = RemoveCommand
