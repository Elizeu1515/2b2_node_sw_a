const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, '..', 'accounts')

module.exports = {
    deposit() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Informe o nome da conta a depositar: '
            }
        ]).then((answer) => {
            const accountName = answer['accountName']
            if (!this.checkAccount(accountName)) {
                setTimeout(function () {
                    console.log(dirPath)
                    console.log(chalk.bgRed.black("Esta conta não existe!"))
                    return this.deposit()
                }, 3000)
            } else {
                inquirer.prompt([
                    {
                        name: 'amount',
                        message: 'Quanto voce deseja depositar?'
                    }
                ]).then((answer) => {
                    const amount = answer['amount']
                    this.addAmount(accountName, amount)
                    operation()
                })
            }
        })
    },
    checkAccount(accountName) {
        if (!fs.existsSync(`${dirPath}/${accountName}.json`)) {
            return false
        }
        return true
    },
    addAmount(accountName, amount) {
        const accountData = this.getAccount(accountName)
    
        if (!amount) {
            console.log(chalk.bgRed.black('Ocorreu um erro! tente novamente mais tarde.'))
            return deposit
        }
    
        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    
        fs.writeFileSync(
            `${dirPath}/${accountName}.json`,
            JSON.stringify(accountData),
            function (err) {
                console.log(err)
            },
        )
        setTimeout(function () {
            console.log(chalk.green('Valor depositado!'))
        }, 2000)
    },
    getAccount(accountName) {
        const accountJson = fs.readFileSync(`${dirPath}/${accountName}.json`, {
            encoding: 'utf-8',
            flag: 'r',
        })
    
        return JSON.parse(accountJson)
    }
}