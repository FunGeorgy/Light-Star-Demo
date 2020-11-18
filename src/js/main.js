import * as PIXI from 'pixi.js'
import anime from 'animejs/lib/anime.es.js';
import PixiApngAndGif from 'pixi-apngandgif';

// Основные параметры приложения
const app = new PIXI.Application({
width: screen.width,
height: screen.height,
backgroundColor: 0x0033ff,

view: document.querySelector('#scene'),
resolution: window.devicePixelRatio || 1
});

const loader = PIXI.Loader.shared,
    title = document.title,
    loadOption = {
        loadType: PIXI.LoaderResource.LOAD_TYPE.XHR,
        xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
        crossOrigin:''
    },
    imgs = {
        rocket:'assets/rocket2.gif',
        booms: 'assets/boom2.gif',
    };


loader.add(imgs.rocket,loadOption);
loader.add(imgs.booms,loadOption);

document.body.appendChild(app.view);

loader.on('progress',(loader,resoure)=>{
  document.title = Math.round(loader.progress);
}).load((progress,resources)=>{
document.title = title;

// Картинка заднего фона
const background_image = PIXI.Texture.from('assets/back2.jpg');
const back = new PIXI.Sprite(background_image);
back.anchor.x = 0;
back.anchor.y = 0;
back.scale.set(0.7);
back.position.x = 0;
back.position.y = 0;
back.alpha = Math.sin(0.80);
app.stage.addChild(back);

// Звезды

const starTexture = PIXI.Texture.from('assets/star.png');

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.2;


// Создание звезд
const stars = [];
for (let i = 0; i < starAmount; i++) {
    const star = {
        sprite: new PIXI.Sprite(starTexture),
        z: 0,
        x: 0,
        y: 0,
    };
    star.alpha = Math.sin(0.80);
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    app.stage.addChild(star.sprite);
    stars.push(star);
}

function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 500 : cameraZ + Math.random() * 250 + 500;

    // Подсчет дистанции звезд относительно камере
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

// Создание метеоритов

const astrosFrames = [
  '/assets/astro2.png',
  '/assets/astro3.png',
  '/assets/astro4.png',
  '/assets/astro.png',
]
const astros = [];
var check = new Boolean(false); 
let lvltarget = 1000;
let level = 1;
var i = 1;  
let timer = 5000;        
function AstroLoop () {           
setTimeout(function () {
    const asteroid = astrosFrames[i%4];
    const astro = PIXI.Sprite.from(asteroid);
    astro.interactive = true;
    astro.buttonMode = true;
    astro.anchor.set(0.5);
    astro.scale.set(0.1 + Math.random() * 0.4);
    astro.x = Math.random() * app.screen.width;
    astro.turningSpeed = Math.random() - 0.8;
    astro.y = 0;
    astro.speed = 1 + Math.random() * level;
    astro.visible = false;
    astros.push(astro);
    app.stage.addChild(astro);;          
    i++;                   
    if (i < lvltarget) {                 
    AstroLoop();                            
    }                                    
  }, Math.random() * timer)
}
AstroLoop();


// Создание взрыва
const texture_boom = PIXI.Texture.from('assets/boom.png')

// Создание пули
const texture2 = PIXI.Texture.from('assets/bullet.png');
const bullet = PIXI.Sprite.from(texture2);
bullet.anchor.set(0.5);
bullet.interactive = true;
bullet.x = app.screen.width/2;
bullet.y = app.screen.height-200;
bullet.scale.set(1.4);
app.stage.addChild(bullet);

// Создание пулемета
let status = Boolean(false);
const gun = [];
let magazine = 50;
var i = 1;        
function GunLoop () {           
setTimeout(function () { 
  
  const texture2 = PIXI.Texture.from('assets/bulletstorm.png');
  const bullet2 = PIXI.Sprite.from(texture2);
  bullet2.anchor.set(0.5);
  bullet2.visible = false;
  bullet2.tint = 0xFFD300;
  bullet2.scale.set(0.01);
  bullet2.interactive = true;
  bullet2.x = app.screen.width/2;
  bullet2.y = app.screen.height-200;
  if(status == true)
    {
      app.stage.addChild(bullet2);
      gun.push(bullet2);
    }
    
  i++;                       
    if (i < magazine) {                 
    GunLoop();                           
    }                                    
  }, 2000)
}
GunLoop();

// Создание ракеты
window.rocket = new PixiApngAndGif(imgs.rocket,resources);
let bunny = window.rocket.sprite;
bunny.anchor.set(0.5);
bunny.x = bullet.x;
bunny.y = bullet.y;
app.stage.addChild(bunny);
let delta = 0;
let bool = 0;

// Создание Взрывов
let boomcounter = [];
let m = 0;
let check_boom = Boolean(true);
for(i = 0; i < 10; i++){
window.booms = new PixiApngAndGif(imgs.booms,resources);
let boom = window.booms.sprite;
boom.anchor.set(0.5);
boom.visible = false;
boom.x = 0;
boom.y = 0;
boom.zIndex = 1000000000;
app.stage.addChild(boom);
boomcounter.push(boom);}

// Созднание аптек
const heals = [];
let lvltarget2 = 1000;
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
  },  Math.random() * (40000 - 10000) + 20000)
}
HealLoop();

// Создание магазинов для пулемета
const magazines = [];
let lvltarget3 = 500;
var i = 1;                    
function MagazineLoop () {           
setTimeout(function () {    
    const magaz = PIXI.Sprite.from('/assets/gunbullet2.png');
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
  }, Math.random() * (60000 - 10000) + 20000)
}
MagazineLoop();

// Текст
  const style = new PIXI.TextStyle({
    fontFamily: 'Perpetua Titling MT',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#ffffff', '#FF0000'],
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round'
});
  

// Game over
const basicText = new PIXI.Text('Game Over', style);
basicText.anchor.set(0.5);
basicText.scale.set(2);
basicText.x = app.screen.width/2;
basicText.y = app.screen.height/3;
basicText.visible = false;
basicText.zIndex = 10;
app.stage.addChild(basicText);

// Текст очков
let pointtarget = 0;
const pointText = new PIXI.Text(pointtarget, style);
basicText.fill = ['#ffffff'];
pointText.x = app.screen.width/7;
pointText.y = app.screen.height/6;
pointText.zIndex = 10;
app.stage.addChild(pointText);

const pointText2 = new PIXI.Text('SCORE:', style)
pointText2.x = pointText.x - 150;
pointText2.y = app.screen.height/6;
pointText2.zIndex = 10;
app.stage.addChild(pointText2);

// Текст жизни
let life = 3;
const lifeText = new PIXI.Text(life, style);
lifeText.x = app.screen.width/7;
lifeText.y = app.screen.height/5;
lifeText.zIndex = 10;
app.stage.addChild(lifeText);

const lifeText2 = new PIXI.Text('TOTAL LIFES:', style)
lifeText2.x = lifeText.x - 260;
lifeText2.y = app.screen.height/5;
lifeText2.zIndex = 10;
app.stage.addChild(lifeText2);

// Уровни

let scale = 0;
const lvlText = new PIXI.Text('LEVEL', style)
lvlText.anchor.set(0.5);
lvlText.scale.set(1.5);
lvlText.x = app.screen.width/2;
lvlText.y = app.screen.height/3;
lvlText.alpha = Math.sin(0);
lvlText.zIndex = 10;
app.stage.addChild(lvlText);

const lvlText2 = new PIXI.Text(level, style)
lvlText2.anchor.set(0.5);
lvlText2.scale.set(1.5);
lvlText2.x = 200 + lvlText.x;
lvlText2.y = app.screen.height/3;
lvlText2.alpha = Math.sin(0);
lvlText2.zIndex = 10;
app.stage.addChild(lvlText2);

// Шкала

// const ScaleTexture = new PIXI.Texture.from("assets/scale1.png")
// const ScaleGun = new PIXI.TilingSprite(
//   ScaleTexture,
//   200,
//   20,
// );

let ScaleGun_Count = 0;

const ScaleGun = new PIXI.NineSlicePlane(PIXI.Texture.from('assets/scale1.png'), 10, 10, 10, 10);
  
ScaleGun.x = lifeText.x;
ScaleGun.y = bunny.y;

app.stage.addChild(ScaleGun);

// Функция обновления тикера сообщения
function updateStatusMessage(Sometext, sometarget) {
  Sometext.text = sometarget;
}

// Переменная для считываения координат мышки

const mouseCoords = app.renderer.plugins.interaction.mouse.global;

// Анимация тикера для звезд
app.ticker.add((delta) => {
  
  speed += (warpSpeed - speed) / 20;
  cameraZ += delta * 10 * (speed + baseSpeed);
  for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      if (star.z < cameraZ) randomizeStar(star);
      // Карта 3D проецирования для звезд
      const z = star.z - cameraZ;
      star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
      star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

      // Рахмер звезд и их вращение
      const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
      const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
      const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
      const distanceScale = Math.max(0, (2000 - z) / 2000);
      star.sprite.scale.x = distanceScale * starBaseSize;
      
      // Движения звезд от центра к краю
      star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
  }
});

app.ticker.add(() => {
  
if(pointtarget == level*10 + Math.floor(scale))
{
  level = Math.floor(level)+1;
  updateStatusMessage(lvlText2,level);
  lvlText.alpha = 1;
  lvlText2.alpha = 1;
  setTimeout(() => {
    lvlText.alpha = 0;
    lvlText2.alpha = 0; 
    if(timer > 400){timer -= 450 }},3000)
} 
if(level > 2)
scale = scale + 0.0005;
console.log('таймер',timer);
})
// Тикер анимации ракеты и ее пули
app.ticker.add(() => {

if (basicText.x > bunny.x)
  {
    bunny.rotation = -0.06;
  }
else if (basicText.x < bunny.x)
{
  bunny.rotation =  0.06;
}
else if(basicText.x == bunny.x)
{
  bunny.rotation = 0;
}

if(life > 0){
  bunny.x = mouseCoords.x;
  
  }
  if(bunny.y == bullet.y)
  bullet.x = bunny.x;
  
  if(bullet.y !=0){
    bullet.y -= 10;
    }
    else if(bullet.y == 0){
    bullet.y = app.screen.height-200;
    }
})

// Тикер анимации для метеоритов и других падающих объектов
// Тикер для падения метеоритов
app.ticker.add(() => {
    
    for (let i = 0; i < astros.length; i++) {
    const astro = astros[i];
    let Time = i + Math.random()*400;
    setTimeout(() => meteor_coming(astro, astros),Time);} 
    console.log("Status",status, "Размер массива",gun.length)
});

// Тикер падения аптечек
app.ticker.add(() => {
  for (let i = 0; i < heals.length; i++) {
    const healpoint = heals[i];
    let Time = i + Math.random()*400;
    setTimeout(() => heal_coming(healpoint),Time);}
})

// Тикер падения магазинов
app.ticker.add(() => {
  
  for (let i = 0; i < magazines.length; i++) {
    const magaz = magazines[i];
    let Time = i + Math.random()*400;
    setTimeout(() => magazine_coming(magaz),Time);} 
})

// Функция исчезновения объекта (со счетчиком)
function visiblity(a){
if(a.interactive == true)
pointtarget++;
check_boom = false;
a.interactive = false;
app.stage.removeChild(a);
updateStatusMessage(pointText,Math.floor(pointtarget));
}

// Функция исчезновения вещей
function heal_visiblity(c){
  app.stage.removeChild(c);
  c.interactive = false;
  bunny.tint = 0xFFFFFF;
  check = false;
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
function meteor_coming(a,b){
a.visible = true;
a.direction += a.turningSpeed * 0.04;
a.rotation += Math.random() * 0.05;
a.y += Math.random() * a.speed;


if(life < 0)
{
  basicText.visible = true;
  let boom = boomcounter[m];
  bunny.scale.set(0.01)
  bunny.visible = false;
  boom.x = bunny.x;
  boom.y = bunny.y
  boom.scale.set(1.5)
  boom.visible = true;
  bullet.y = 0;
  bullet.alpha = 0;
  updateStatusMessage(lifeText, 0);
  setTimeout(() => {
    boom.visible = false;
  }, 800);
  life = 0;
}
else if(react(a, bunny) && life > 0 && a.interactive == true)
  { 
    bool = 0;
    app.ticker.add(bunny_alpha_animate);
    life -= 0.018;
    setTimeout(function status(){bool = 1; bunny.alpha = 1;},2000);
    updateStatusMessage(lifeText, Math.floor(life));
    }
if (react(a, bullet) && a.interactive == true){
  let boom = boomcounter[m];
  a.scale.set(0.01)
  a.visible = false;
  boom.x = a.x;
  boom.y = a.y
  boom.visible = true;
  setTimeout(() => visiblity(a),500);
  b.splice(i);
  m++;
  console.log('элемент массива взрыва',m,'булевая',check_boom)
  setTimeout(() => {
    boom.visible = false;
  }, 500);
  

if (delta == 0)
  delta += 0.1;
if(m == boomcounter.length-1)
m = 0;
}
if(a.y == bunny.y + 50)
{
  a.interactive = false;
  app.stage.ticker.stop(a);
  app.stage.removeChild(a);
  a.destroy();
  b.splice(i);
}

// Реакция пулемета на астеройды
  
  for(let i = 0; i < gun.length; i++) {
  const bullet2 = gun[i];
  if(bunny.y > bullet2.y)
    bullet2.x = bunny.x;
  if(bullet2.y !=0){
  bullet2.y -= 5;
  }
  else {
  bullet2.y = app.screen.height-300;
  }
  if (react(a, bullet2) && bullet2.visible == true){
    a.texture = texture_boom;
    a.rotation -= Math.random() * 0.05;
    a.scale.set(0.1);
    a.tint = 0xFFFFFF;
    setTimeout(() => visiblity(a),200);}
  if(status == true){
  bullet.visible = false;
  bullet2.visible = true;
  setTimeout(() => {
    status = false;
  },10000);
  
}
if(status == false)
{ bullet2.y = bunny.y;
  bullet2.visible = false; 
  bullet.visible = true;
}
} 

}
// Создание аптек в анимации и его реакция на объекты
function heal_coming(b){
  b.visible = true;
  b.direction += b.turningSpeed * 0.04;
  b.y += Math.random() * b.speed;
  
  if(react(b, bunny)&&life>0&&b.interactive == true)
    { life += 0.018;
      bunny.tint = 0xFF0000;
      setTimeout(()=> heal_visiblity(b), 500);
      updateStatusMessage(lifeText, Math.floor(life));
    }
    if(b.y == bunny.y - 50)
{
  app.stage.ticker.stop(b);
  b.destroy;
  b.splice(i);
}
}

// Создание магазинов в анимации и его реакция на объекты
function magazine_coming(b){
  b.visible = true;
  b.direction += b.turningSpeed * 0.04;
  b.y += Math.random() * b.speed;
  if(react(b, bunny)&&b.interactive == true && life > 0)
    { status = true;
      check = true;
      bunny.tint = 0xFF0000;
      setTimeout(()=> heal_visiblity(b), 500);
    }
    if(b.y == bunny.y - 50)
{
  app.stage.ticker.stop(b);
  b.destroy;
  b.splice(i);
}
}

// Anime.Js Анимации 
});