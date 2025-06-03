const inquirer = require('inquirer')
const accountModule = require('./modules/moduleAcounts')
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
            createAccount()
        } else if (action === 'Depositar') {
            deposit()
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

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Informe o nome da conta a depositar: '
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if (!checkAccount(accountName)) {
            setTimeout(function () {
                console.log(chalk.bgRed.black("Esta conta não existe!"))
                return deposit()
            }, 3000)
        } else {
            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto voce desja depositar?'
                }
            ]).then((answer) => {
                const amount = answer['amount']
                addAmount(accountName, amount)
                operation()
            })
        }
    })
}
function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro! tente novamente mais tarde.'))
        return deposit
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )
    setTimeout(function () {
        console.log(chalk.green('Valor depositado!'))
    }, 2000)
}
function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r',
    })

    return JSON.parse(accountJson)
}
function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        return false
    }
    return true
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
function withdraw(){
    inquirer
    .prompt([
    {
        name: 'accountName',
        message: 'qual conta deseja sacar?',
    },
    ]).then((answer) => {
        const accountname = answer = ['account name']

        if(checkAccount(accountname)){ 
        return withdraw()
    }
    inquirer
    .prompt([
        {
            name:'amount',
            message: 'qual o valor da retirada?'
        }
    ])
    }).then((answer) =>  {
        const amount = answer['amount']

        removeAmount(accountName, amount)
    })
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(
            chalk.bgRed.black('ocorreu um erro tente novamente mais tarde')
        )
        return withdraw()
    }

    if(accountData.balance < amount){ 
    console.log( 
        chalk.bdRed.black('valor indisponivel')
   )
   return withdraw()
}

accountData.balance = parseFloat(accountData.balance) - persefloat(amount)

fs.writeFileSync(
`accounts/${accountName}.json`,
JSON.stringify(accountData),
function (err){
    console.log(err)
 }

)
console.log(
    chalk.green(`foi sacado: R$ ${amount}da conta. saldo: R$ ${accountData.balance}.`)
)
 }