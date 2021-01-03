#!/usr/bin/env node

const fetch = require('node-fetch')
const open = require('open')
const arg = require('arg')
const inquirer = require('inquirer')
const chalk = require('chalk')

const parseArgs = () => {
  const args = arg(
    {
      '--open': Boolean,
      '--yes': Boolean,
      '-o': '--open',
      '-y': '--yes',
    },
    {
      argv: process.argv.slice(2),
    }
  )
  return {
    open: args['--open'] || false,
  }
}

const promptQuestions = async (options) => {
  const questions = []

  if (!options.open) {
    questions.push({
      type: 'confirm',
      name: 'open',
      message: 'Open the website on your browser?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    open: options.open || answers.open,
  }
}

const launchWebsite = async (result) => {
  let options = parseArgs()
  options = await promptQuestions(options)
  if (options.open) open(`https://${result.domain}`)
}

const website = process.argv[2]

const check = (name) => {
  if (name.includes('http') || name.includes('www')) {
    name = name.replace(/https?:\/\/|www./, '')
  }

  if (name.indexOf('.') > -1) {
    const data = fetch(`https://isitup.org/${name}.json`).then((response) =>
      response.json()
    )

    data.then((result) => {
      if (result.response_code == 200) {
        console.log(chalk.green('website is up and running'))
        launchWebsite(result)
      } else if (result.response_code == 301) {
        console.log(
          chalk.green('website has been moved permanently, but is up')
        )
        launchWebsite(result)
      } else if (result.response_code == 302) {
        console.log(chalk.blue('temporary redirect, website is up'))
        launchWebsite(result)
      } else if (result.response_code == 403) {
        console.log(chalk.red('information not found'))
        launchWebsite(result)
      } else {
        console.log(chalk.red('website is down'))
      }
    })
  } else {
    console.log(
      chalk.brightYellow('please append your url extension - example.com')
    )
  }
}

check(website)
