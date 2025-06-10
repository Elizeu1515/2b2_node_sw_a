const inquirer = require('inquirer')
const create = require('./modules/create')
const manager = require('./modules/manager')
const chalk = require('chalk')

const fs = require('fs')
operation()
function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        }
    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar conta') {
            create.createAccount()
        } else if (action === 'Depositar') {
            manager.deposit()
        } else if (action === 'Consultar saldo') {
            getAccountBalance()
        } else if (action === 'Sacar') {
            withdraw()
        } else if (action === 'Sair') {
            console.log('Saindo do sistema...')
            process.exit()
        } else {
            console.log('Nao e valido')
        }
    })
}

function getAccountBalance() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Qual nome da conta deseja o saldo?',
            },
        ]).then((answer) => {
            const accountName = answer['accountName']

            if (!checkAccount(accountName)) {
                return getAccountBalance()
            }

            const accountData = getAccount(accountName)

            console.log(
                chalk.bgBlue.black(`Ola, o saldo da sua conta e R${accountData.balance}`,
                ),
            )
            operation()
        })
}
function withdraw() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Qual conta deseja sacar?',
            },
        ]).then((answer) => {
            const accountName = answer['accountName']

            if (!checkAccount(accountName)) {
                return withdraw()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message: 'Qual o valor da retirada?'
                    }
                ])
        }).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
        })
}
function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(
            chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde.')
        )
        return withdraw()
    }

    if (accountData.balance < amount) {
        console.log(
            chalk.bdRed.black('Valor Indisponivel')
        )
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(
        chalk.green(`Foi sacado: R$ ${amount} da conta. Saldo: R$ ${accountData.balance}.`)
    )
}