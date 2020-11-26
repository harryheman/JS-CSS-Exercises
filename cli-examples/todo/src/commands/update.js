const { Command } = require('@oclif/command')
const { Todo } = require('../db')
const chalk = require('chalk')

class UpdateCommand extends Command {
  async run() {
    const { id } = this.parse(UpdateCommand).args
    try {
      await Todo.find({ id: parseInt(id, 10) })
        .assign({ done: true })
        .write()
      this.log(chalk.green('Todo updated.'))
    } catch {
      this.log('Operation failed.')
    }
  }
}

UpdateCommand.description = `Marks a task as done by id`

UpdateCommand.args = [
  {
    name: 'id',
    description: 'todo id',
    required: true,
  },
]

module.exports = UpdateCommand
