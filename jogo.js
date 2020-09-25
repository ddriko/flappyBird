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

const flappyBird = {
    spriteX: 0, 
    spriteY: 0, 
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    velocidade: 0,
    gravidade:0.25,
    atualiza() {
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




function loop() {
    flappyBird.atualiza()
    planoDeFundo.desenha()
    chao.desenha()
    flappyBird.desenha()

    requestAnimationFrame(loop)
}

loop()
