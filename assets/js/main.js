function preload () {
  this.load.image('sky', 'assets/sprites/sky.png');
  this.load.image('ground', 'assets/sprites/platform.png');
  this.load.image('star', 'assets/sprites/star.png');
  this.load.atlas('hamtaro', 'assets/sprites/hamham.png', 'assets/sprites/hamtaro.json')
}

function create () {
  ceu = this.add.image(400, 300, 'sky').setScale(4);

  titulo = this.add.text(100, 50, 'Hamtaro!', { 
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  })

  pontuacao = this.add.text(100, 100, 'Pontos: 0', { 
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  })

  this.pontuacao = 0;
  
  piso = this.physics.add.staticGroup();
  piso.create(0, 968, 'ground').setScale(3).refreshBody();
  piso.create(1400, 968, 'ground').setScale(3).refreshBody();
  piso.create(700, 400, 'ground');
  piso.create(250, 650, 'ground');
  piso.create(1050, 620, 'ground');

  personagem = this.physics.add.sprite(400, 400, 'hamtaro')
  personagem.setBounce(0.2);
  personagem.setCollideWorldBounds(true);

  estrelas = this.physics.add.group({
    key: 'star',
    repeat: 20,
    setXY: { x: 30, y: 0, stepX: 75 }
  });

  estrelas.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(personagem, piso);
  this.physics.add.collider(estrelas, piso);

  this.physics.add.overlap(personagem, estrelas, pegarEstrela, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({ 
    key: 'direita', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 1,
        end: 3            
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({ 
    key: 'esquerda', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 4,
        end: 6            
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({ 
    key: 'cima', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 7,
        end: 8           
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({ 
    key: 'baixo', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 9,
        end: 10            
    }),
    repeat: -1,
    duration: 300
  });

  this.anims.create({ 
    key: 'parado', 
    frames: this.anims.generateFrameNames('hamtaro', { 
      prefix: 'hamtaro_', 
      start: 11,
      end: 12
    }),
    repeat: -1,
    duration: 300
  });
}

function pegarEstrela (personagem, star) {
  star.disableBody(true, true);
  this.pontuacao = this.pontuacao + 1
  pontuacao.setText(`Pontos: ${this.pontuacao}`)
}

function update () {
  if (cursors.left.isDown) {
    personagem.setVelocityX(-160);
    personagem.anims.play('esquerda', true);
  }
  else if (cursors.right.isDown) {
    personagem.setVelocityX(160);
    personagem.anims.play('direita', true);
  }
  else if (cursors.up.isDown && personagem.body.touching.down) {
    personagem.setVelocityY(-460);
  }
  else {
    personagem.setVelocityX(0);
    personagem.anims.play('parado');
  }
}

function main () {
  var largura = window.innerWidth
  var altura = window.innerHeight

  var conf = {
    type: Phaser.AUTO,
    width: largura,
    height: altura,
    pixelArt: true,
    backgroundColor: '#b3e6ff',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  }

  var game = new Phaser.Game(conf)
}

window.onload = main