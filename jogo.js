let frames = 0
const somDe_Hit = new Audio()
somDe_Hit.src = './efeitos/hit.wav'

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

function criaChao() {
   const chao = {
    spriteX: 0, 
    spriteY: 610, 
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
        const movimentoDoChao = 1
        const repeteEm = chao.largura / 2
        const movimentacao = chao.x - movimentoDoChao

        chao.x = movimentacao % repeteEm
    },
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
return chao
}

function FazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if(flappyBirdY >= chaoY) {
        return true
    }
    return false 
}

function criaFlappyBird(){
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
        if(FazColisao(flappyBird, globais.chao)) {
            console.log('fez colisão')

            somDe_Hit.play()
            setTimeout(() => {
                mudaParaTela(Telas.INICIO)
            }, 500) 
            return 
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade 
        // console.log(flappyBird.velocidade)
    },
    movimentos: [
        {spriteX: 0, spriteY: 0, }, // asa pra cima
        {spriteX: 0, spriteY: 26, }, // asa no meio
        {spriteX: 0, spriteY: 52, }, // asa pra baixo
        {spriteX: 0, spriteY: 26, } // asa no meio

    ],
    frameAtual: 0,
    atualizaFrame() {
        const intervaloDeFrames = 10
        const passouOIntervalo = frames % intervaloDeFrames === 0

        if(passouOIntervalo) {
            const baseDoIncremento = 1
            const incremento = baseDoIncremento + flappyBird.frameAtual
            const baseRepeticao = flappyBird.movimentos.length
            flappyBird.frameAtual = incremento % baseRepeticao
        }
        
    },
    desenha() {
        flappyBird.atualizaFrame()
        const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]
        context.drawImage(
            sprites,
            spriteX, spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        )
    }
    } 
    return flappyBird
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

const globais = {}
let telaAtiva = {}
function mudaParaTela (novaTela) {
    telaAtiva = novaTela

    if(telaAtiva.inicializa) {
         telaAtiva.inicializa()    
    }
}

const Telas = {
    INICIO:  {
        inicializa() {
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
        },
        desenha() {
            planoDeFundo.desenha()
            globais.chao.desenha()
            globais.flappyBird.desenha()
            getReady.desenha()
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {
            globais.chao.atualiza()
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha()
        globais.chao.desenha()
        globais.flappyBird.desenha()
    }, 
    click() {
        globais.flappyBird.pula()
    },
    atualiza() {
        globais.chao.atualiza()
        globais.flappyBird.atualiza();

    }
}


function loop() {
    telaAtiva.desenha()
    telaAtiva.atualiza()

    frames = frames + 1
    requestAnimationFrame(loop)
}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()


