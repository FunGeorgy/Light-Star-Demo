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

// Картинка заднего фона
const background_image = PIXI.Texture.from('assets/stars.jpg');
const back = new PIXI.Sprite(background_image);
back.anchor.x = 0;
back.anchor.y = 0;
back.scale.set(1.75);
back.position.x = 0;
back.position.y = 0;
app.stage.addChild(back);

// Создание взрыва
const texture_boom = PIXI.Texture.from('assets/boom.png')
const boom = new PIXI.Sprite(texture_boom);

// Создание пули
const texture2 = PIXI.Texture.from('assets/bullet.png');
const bullet = PIXI.Sprite.from(texture2);
bullet.anchor.set(0.5);
bullet.interactive = true;
bullet.x = screen.width/2;
bullet.y = screen.height-200;
bullet.scale.set(1.4);
app.stage.addChild(bullet);

// Создание пулемета
const magazine = 1000;
const gun = [];
let status = 0;
for(let i = 0; i < magazine; i++)
{
const texture2 = PIXI.Texture.from('assets/bullet.png');
const bullet2 = PIXI.Sprite.from(texture2);
bullet2.anchor.set(0.5);
bullet2.visible = false;
bullet2.interactive = true;
bullet2.x = screen.width/2;
bullet2.y = screen.height-200;
bullet2.scale.set(1.4);
gun.push(bullet2);
app.stage.addChild(bullet);
}

// Создание ракеты
const texture = PIXI.Texture.from('assets/rocket.png');
const bunny = new PIXI.Sprite(texture);
bunny.anchor.set(0.5);
bunny.scale.set(0.05);
bunny.x = bullet.x;
bunny.y = bullet.y
app.stage.addChild(bunny);
let delta = 0;
let bool = 0;


// Создание метеоритов
const astros = [];
let lvltarget = 1000;
var i = 1;                    
function AstroLoop () {           
setTimeout(function () {    
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
    app.stage.addChild(astro);;          
    i++;                                            
    if (i < lvltarget) {                 
    AstroLoop();                            
    }                                    
  }, Math.random() * 2000)
}
AstroLoop();

// Созднание аптек
const heals = [];
let lvltarget2 = 10;
var i = 1;                    
function HealLoop () {           
setTimeout(function () {    
    const healpoint = PIXI.Sprite.from('/assets/healpoint.png');
    healpoint.interactive = true;
    healpoint.anchor.set(0.5);
    healpoint.x = Math.random() * app.screen.width;
    healpoint.turningSpeed = Math.random() - 0.8;
    healpoint.y = 0;
    healpoint.scale.set(0.3);
    healpoint.speed = 1 + Math.random() * 2;
    healpoint.visible = false;
    heals.push(healpoint);
    app.stage.addChild(healpoint);;          
    i++;                                            
    if (i < lvltarget2) {                 
    HealLoop();                            
    }                                    
  }, Math.random() * 20000)
}
HealLoop();

// Создание магазинов для пулемета
const magazines = [];
let lvltarget3 = 20;
var i = 1;                    
function MagazineLoop () {           
setTimeout(function () {    
    const magaz = PIXI.Sprite.from('/assets/gunbullet.png');
    magaz.interactive = true;
    magaz.anchor.set(0.5);
    magaz.x = Math.random() * app.screen.width;
    magaz.turningSpeed = Math.random() - 0.8;
    magaz.y = 0;
    magaz.scale.set(0.3);
    magaz.speed = 1 + Math.random() * 2;
    magaz.visible = false;
    magazines.push(magaz);
    app.stage.addChild(magaz);;          
    i++;                                            
    if (i < lvltarget3) {                 
    MagazineLoop();                            
    }                                    
  }, Math.random() * 20000)
}
MagazineLoop();

// Текст
const style = new PIXI.TextStyle({
  fill: ['#ffffff', '#FF0000'],
});
// Game over
const basicText = new PIXI.Text('Game Over', style);
basicText.x = screen.width/2;
basicText.y = screen.height/3;
basicText.visible = false;
app.stage.addChild(basicText);

// Текст очков
let pointtarget = 0;
const pointText = new PIXI.Text(pointtarget, style);
basicText.fill = ['#ffffff'];
pointText.x = screen.width/7;
pointText.y = screen.height/6;
app.stage.addChild(pointText);

const pointText2 = new PIXI.Text('Счет:', style)
pointText2.x = pointText.x - 100;
pointText2.y = screen.height/6;
app.stage.addChild(pointText2);

// Текст жизни
let life = 3;
const lifeText = new PIXI.Text(life, style);
lifeText.x = screen.width/7;
lifeText.y = screen.height/5;
app.stage.addChild(lifeText);

const lifeText2 = new PIXI.Text('Жизнь:', style)
lifeText2.x = lifeText.x - 100;
lifeText2.y = screen.height/5;
app.stage.addChild(lifeText2);

// Функция обновления тикера сообщения
function updateStatusMessage(Sometext, sometarget) {
  Sometext.text = sometarget;
}

// Тикер анимации ракеты и ее пули
app.ticker.add(() => {
const mouseCoords = app.renderer.plugins.interaction.mouse.global;
if(life > 0){
bunny.x = mouseCoords.x;
}
if(bunny.y == bullet.y)
bullet.x = bunny.x;

if(bullet.y !=0){
  bullet.y -= 10;
  }
  else if(bullet.y == 0){
  bullet.y = screen.height-200;
  }
})

// Тикер анимации для метеоритов и других падающих объектов
app.ticker.add(() => {
    
    for (let i = 0; i < astros.length; i++) {
    const astro = astros[i];
    let Time = i + Math.random()*400;
    setTimeout(() => meteor_coming(astro),Time);} 
});

app.ticker.add(() => {
  for (let i = 0; i < heals.length; i++) {
    const healpoint = heals[i];
    let Time = i + Math.random()*400;
    setTimeout(() => heal_coming(healpoint),Time);}
})

app.ticker.add(() => {
  if(status == 1)
  {
  for(let i = 0; i < magazine.length; i++) {
    const bullet2 = magazine[i];
    gunner(bullet2);
    if (i == magazine.length-1)
    status = 0;
  }
}
})

app.ticker.add(() => {
  for (let i = 0; i < magazine.length; i++) {
    const magaz = magazines[i];
    let Time = i + Math.random()*400;
    setTimeout(() => magazine_coming(magaz),Time);} 
})
// Функция исчезновения объекта (со счетчиком)
function visiblity(a){
a.destroy();
pointtarget++;
updateStatusMessage(pointText,pointtarget);
}

// Функция исчезновения вещей
function heal_visiblity(b){
  b.destroy();
  bunny.tint = 0xFFFFFF;
  bunny.scale.set(0.07);
  }


// Мигание ракеты в следствии попадания снаряда
function bunny_alpha_animate()
{
if(bool == 0)
{
delta+=0.01
bunny.alpha = Math.sin(delta);
}
}

// Функция реакции объекта на другой объект
function react(a, b){
let aBox = a.getBounds();
let bBox = b.getBounds();
return aBox.x + aBox.width > bBox.x &&
aBox.x < bBox.x + bBox.width &&
aBox.y + aBox.height > bBox.y &&
aBox.y < bBox.y + bBox.height;
}

// Создание метеора в анимации и его реакции на объекты
function meteor_coming(a){
a.visible = true;
a.direction += a.turningSpeed * 0.04;
a.rotation += Math.random() * 0.05;
a.y += Math.random() * a.speed;

if(life < 0)
{
  basicText.visible = true;
  bunny.texture = texture_boom;
  bunny.scale.set(0.4);
  bullet.y = 0;
  bullet.alpha = 0;
  updateStatusMessage(lifeText, 0);
}
else if(react(a, bunny) && life > 0)
  { bool = 0;
    app.ticker.add(bunny_alpha_animate);
    life -= 0.018;
    setTimeout(function status(){bool = 1; bunny.alpha = 1;},2000);
    updateStatusMessage(lifeText, Math.floor(life));
  }
if (react(a, bullet) || react(a, bullet2)){
  a.texture = texture_boom;
  a.scale.set(0.1);
  a.tint = 0xFFFFFF;
  setTimeout(() => visiblity(a),200);
if (delta == 0)
  delta += 0.1;
  }
}

// Создание аптек в анимации и его реакция на объекты
function heal_coming(b){
  b.visible = true;
  b.direction += b.turningSpeed * 0.04;
  b.y += Math.random() * b.speed;

  if(react(b, bunny))
    { life += 0.018;
      bunny.tint = 0xFF0000;
      setTimeout(()=> heal_visiblity(b), 500);
      updateStatusMessage(lifeText, Math.floor(life));
    }
  }

// Создание анимации пулемета
function gunner(a){
  a.visible = true;
  if(bunny.y == a.y)
a.x = bunny.x;
if(a.y !=0){
  setTimeout(()=> function ping_bullet(){a.y -= 20;},200);
  }
  else if(a.y == 0){
  a.y = screen.height-200;
  }
}

// Создание магазинов в анимации и его реакция на объекты
function magazine_coming(b){
  b.visible = true;
  b.direction += b.turningSpeed * 0.04;
  b.y += Math.random() * b.speed;
  if(react(b, bunny))
    { status = 1;
      bunny.tint = 0xFF0000;
      setTimeout(()=> heal_visiblity(b), 500);
    }
  }
