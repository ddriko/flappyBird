const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const planoDeFundo = { 
    spriteX: 390, 
    spriteY: 0, 
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        context.fillStyle = '#70c5ce'
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
            )

            context.drawImage(
                sprites,
                planoDeFundo.spriteX, planoDeFundo.spriteY,
                planoDeFundo.largura, planoDeFundo.altura,
                planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y,
                planoDeFundo.largura, planoDeFundo.altura,
                )
        }
}

const chao = {
    spriteX: 0, 
    spriteY: 610, 
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        context.drawImage(
           sprites,
           chao.spriteX, chao.spriteY,
           chao.largura, chao.altura,
           chao.x, chao.y,
           chao.largura, chao.altura,
        )

        context.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x + chao.largura, chao.y,
            chao.largura, chao.altura,
        )
    }
    
}

function FazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if(flappyBirdY >= chaoY) {
        return true
    }
    return false 
}

const flappyBird = {
    spriteX: 0, 
    spriteY: 0, 
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        flappyBird.velocidade = - flappyBird.pulo
    },
    gravidade:0.25,
    velocidade: 0,
    atualiza() {
        if(FazColisao(flappyBird, chao)) {
            console.log('fez colisão')
            return 
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade 

        // console.log(flappyBird.velocidade)
    },
    desenha() {
        context.drawImage(
            sprites,
           flappyBird.spriteX, flappyBird.spriteY,
           flappyBird.largura, flappyBird.altura,
           flappyBird.x, flappyBird.y,
           flappyBird.largura, flappyBird.altura,
        )
    }
}

const getReady = {
    spriteX: 134, 
    spriteY: 0, 
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        context.drawImage(
           sprites,
           getReady.spriteX, getReady.spriteY,
           getReady.largura, getReady.altura,
           getReady.x, getReady.y,
           getReady.largura, getReady.altura,
        )
    }
    
}

let telaAtiva = {}

function mudaParaTela (novaTela) {
    telaAtiva = novaTela
}

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha()
            chao.desenha()
            flappyBird.desenha()
            getReady.desenha()
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza(){
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha()
        chao.desenha()
        flappyBird.desenha()
    }, 
    click() {
        flappyBird.pula()
    },
    atualiza() {
        flappyBird.atualiza()
    }
}


function loop() {
    telaAtiva.desenha()
    telaAtiva.atualiza()

    requestAnimationFrame(loop)
}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()
