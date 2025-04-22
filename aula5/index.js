const inquirer = require('inquirer')
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
            console.log(action)
        } else if (action === 'Consultar saldo') {
            console.log(action)
        } else if (action === 'Sacar') {
            console.log(action)
        } else if (action === 'Sair') {
            console.log('Saindo do sistema...')
            process.exit()
        } else {
            console.log('Nao e valido')
        }
    })
}
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
 
 
    buildAccount()
}
function buildAccount() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite um nome para a sua conta:',
            },
        ])
        .then((answer) => {
            console.info(answer['accountName'])
 
 
            const accountName = answer['accountName']
 
 
            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }
 
 
            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(
                    chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
                )
                buildAccount(accountName)
            }
 
 
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance":0}',
                function (err) {
                    console.log(err)
                },
            )
 
 
            console.log(chalk.green('Parabéns, sua conta foi criada!'))
            operation()
        })
}
function  deposit(){
    inquirer.prompt([
{
name:'accountName',
message: 'informe o nome da conta a depositar'
}


    ])([.then((answer))
    const accountName = answer['accountname']
])
}
function chekAccount(accountName){
    if(!fs.existsSync(`accounts/${accountname}.json`)){
        return false
    }
    return true
}