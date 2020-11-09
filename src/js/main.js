import * as PIXI from 'pixi.js'
import anime from 'animejs/lib/anime.es.js';
// Основные параметры приложения

const app = new PIXI.Application({
width: screen.width,
height: screen.height,
backgroundColor: 0x1099bb,
view: document.querySelector('#scene'),
resolution: window.devicePixelRatio || 1
});


// Текст
const basicText = new PIXI.Text('Финал');
basicText.x = screen.width/2;
basicText.y = screen.height/3;
basicText.visible = false;
app.stage.addChild(basicText);

function updateStatusMessage(pointtarget) {
  pointText.text = pointtarget;
}

let pointtarget = 0;
const pointText = new PIXI.Text(pointtarget)
pointText.x = screen.width/4;
basicText.y = screen.height/4;
app.stage.addChild(pointText);

const astros = [];

// Создание взрыва
const texture_boom = PIXI.Texture.from('assets/boom.png')
const boom = new PIXI.Sprite(texture_boom);

// Создание ракеты
const texture = PIXI.Texture.from('assets/bunny.png');
const bunny = new PIXI.Sprite(texture);
bunny.anchor.set(0.5);
bunny.x = screen.width/2;
bunny.y = screen.height-200;
app.stage.addChild(bunny);

// Создание пули
const texture2 = PIXI.Texture.from('assets/bullet.png');
const bullet = PIXI.Sprite.from(texture2);
bullet.anchor.set(0.5);
bullet.interactive = true;
bullet.x = bunny.x;
bullet.y = bunny.y;
app.stage.addChild(bullet);

// Создание метеоритов
let lvltarget = 1000;
var i = 1;                     //  set your counter to 1
function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
    const astro = PIXI.Sprite.from('/assets/astero.png');
    astro.interactive = true;
    astro.buttonMode = true;
    astro.anchor.set(0.5);
    astro.scale.set(0.1 + Math.random() * 0.3);
    astro.x = Math.random() * app.screen.width;
    astro.turningSpeed = Math.random() - 0.8;
    astro.y = 0;
    astro.speed = 1 + Math.random() * 2;
    astro.tint = Math.random() * 0xFFFFFF;
    astro.visible = false;
    astros.push(astro);
    app.stage.addChild(astro);;          //  your code here
    i++;                                 //  increment the counter            
    if (i < lvltarget) {            //  if the counter < 10, call the loop function
    myLoop();             //  ..  again which will trigger another 
    }                        //  ..  setTimeout()
  }, 3000)
}

myLoop();              





// Тикер анимации ракеты и ее пули
app.ticker.add(() => {
const mouseCoords = app.renderer.plugins.interaction.mouse.global;
bunny.x = mouseCoords.x;

if(bunny.y == bullet.y)
bullet.x = bunny.x;

if(bullet.y !=0){
  bullet.y -= 10;
  }
  else if(bullet.y == 0){
  bullet.y = screen.height-200;
  }
})


// Тикер анимации для метеоритов

app.ticker.add(() => {
  
    for (let i = 0; i < astros.length; i++) {
    const astro = astros[i];
    let Time = i + Math.random()*2000;
    setTimeout(() => meteor_coming(astro),Time);}
    
});


// функция исчезновения объекта
function visiblity(a){
a.destroy();
pointtarget++;
  updateStatusMessage(pointtarget);
}

// функция реакции объекта на другой объект
function react(a, b){
let aBox = a.getBounds();
let bBox = b.getBounds();
return aBox.x + aBox.width > bBox.x &&
aBox.x < bBox.x + bBox.width &&
aBox.y + aBox.height > bBox.y &&
aBox.y < bBox.y + bBox.height;
}

// Создание метеора и его реакции на объекты
function meteor_coming(a){
a.visible = true;
a.direction += a.turningSpeed * 0.04;
a.rotation += Math.random() * 0.05;
a.y += Math.random() * a.speed;
if(react(a, bunny))
  {
  bunny.texture = texture_boom;
  bunny.scale.set(0.1);
  bunny.tint = 0xFFFFFF;
  setTimeout(() => visiblity(bunny),500);
  basicText.visible = true;
  
  }
if (react(a, bullet)){
  a.texture = texture_boom;
  a.scale.set(0.1);
  a.tint = 0xFFFFFF;
  setTimeout(() => visiblity(a),200);
  
  }
}