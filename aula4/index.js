const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')
const { type } = require('os')
operation()
function operation(){
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            messagem: 'Escolha uma das opcoes do menu: ',
            choices:[
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer) => {
        const action = answer['action']

        if(action === 'Criar conta'){
            console.log('Criando a conta...')
        }else if(action === 'Consultar saldo'){
            console.log('Consultando saldo...')
        }else if(action === 'Depositar'){
            console.log('Deposintado...')
        }else if(action === 'Sacar'){
            console.log('Retirndo saque...')
        }else if(action === 'Sair'){
            console.log('Saindo do sistema..')
        }else{
            console.log('Opicao Invalida!')
        }
    })
}