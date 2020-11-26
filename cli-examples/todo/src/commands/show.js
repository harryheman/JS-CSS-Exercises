const { Command } = require('@oclif/command')
const { Todo } = require('../db')
const chalk = require('chalk')

class ShowCommand extends Command {
  async run() {
    const res = await Todo.sortBy('id').value()
    if (res.length) {
      res.forEach(({ id, task, done }) => {
        this.log(
          `[${
            done ? chalk.green('DONE') : chalk.red('NOT DONE')
          }] id: ${chalk.yellowBright(id)}, task: ${chalk.yellowBright(task)}`
        )
      })
    } else {
      console.log('There are no todos.')
    }
  }
}

ShowCommand.description = `Shows existing tasks`

module.exports = ShowCommand
