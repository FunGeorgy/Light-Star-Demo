import * as PIXI from 'pixi.js'
import anime from 'animejs/lib/anime.es.js';
import PixiApngAndGif from 'pixi-apngandgif';

// Основные параметры приложения
const app = new PIXI.Application({
width: screen.width,
height: screen.height,
backgroundColor: 0x0033ff,

view: document.querySelector('#scene'),
resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared,
    title = document.title,
    loadOption = {
        loadType: PIXI.LoaderResource.LOAD_TYPE.XHR,
        xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
        crossOrigin:''
    },
    imgs = {
        rocket:'assets/rocket4.gif',
        booms: 'assets/boom2.gif',
    };


loader.add(imgs.rocket,loadOption);
loader.add(imgs.booms,loadOption);

document.body.appendChild(app.view);

loader.on('progress',(loader,resoure)=>{
  document.title = Math.round(loader.progress);
}).load((progress,resources)=>{
document.title = title;

// Options for how objects interact
// How fast the red square moves
const movementSpeed = 0.05;

// Strength of the impulse push between two objects
const impulsePower = 5;

// Test For Hit
// A basic AABB check between two different squares
function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
function collisionResponse(object1, object2) {
    if (!object1 || !object2) {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
    );
}

// Calculate the distance between two given points
function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

// // The green square we will knock about
// const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
// greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
// greenSquare.width = 100;
// greenSquare.height = 100;
// greenSquare.tint = '0x00FF00';
// greenSquare.acceleration = new PIXI.Point(0);
// greenSquare.mass = 3;

// // The square you move around
// const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
// redSquare.position.set(0, 0);
// redSquare.width = 100;
// redSquare.height = 100;
// redSquare.tint = '0xFF0000';
// redSquare.acceleration = new PIXI.Point(0);
// redSquare.mass = 1;

// Listen for animate update
function Phisicks(redSquare, greenSquare){}
//     // Applied deacceleration for both squares, done by reducing the
//     // acceleration by 0.01% of the acceleration every loop
//     redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99);
//     greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99);

    

//     // Check whether the green square ever moves off the screen
//     // If so, reverse acceleration in that direction
//     if (greenSquare.x < 0 || greenSquare.x > (app.screen.width - 100)) {
//         greenSquare.acceleration.x = -greenSquare.acceleration.x;
//     }

//     if (greenSquare.y < 0 || greenSquare.y > (app.screen.height - 100)) {
//         greenSquare.acceleration.y = -greenSquare.acceleration.y;
//     }

//     // If the green square pops out of the cordon, it pops back into the
//     // middle
//     if ((greenSquare.x < -30 || greenSquare.x > (app.screen.width + 30))
//         || greenSquare.y < -30 || greenSquare.y > (app.screen.height + 30)) {
//         greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
//     }


//         // Figure out the speed the square should be travelling by, as a
//         // function of how far away from the mouse pointer the red square is
//         const distMouseRedSquare = distanceBetweenTwoPoints(
//             mouseCoords,
//             redSquareCenterPosition,
//         );
//         const redSpeed = distMouseRedSquare * movementSpeed;

//         // Calculate the acceleration of the red square
//         redSquare.acceleration.set(
//             Math.cos(angleToMouse) * redSpeed,
//             Math.sin(angleToMouse) * redSpeed,
//         );
//     }


//     // If the two squares are colliding
//     if (testForAABB(greenSquare, redSquare)) {
//         // Calculate the changes in acceleration that should be made between
//         // each square as a result of the collision
//         const collisionPush = collisionResponse(greenSquare, redSquare);
//         // Set the changes in acceleration for both squares
//         redSquare.acceleration.set(
//             (collisionPush.x * greenSquare.mass),
//             (collisionPush.y * greenSquare.mass),
//         );
//         greenSquare.acceleration.set(
//             -(collisionPush.x * redSquare.mass),
//             -(collisionPush.y * redSquare.mass),
//         );
//     }

//     greenSquare.x += greenSquare.acceleration.x * delta;
//     greenSquare.y += greenSquare.acceleration.y * delta;

//     redSquare.x += redSquare.acceleration.x * delta;
//     redSquare.y += redSquare.acceleration.y * delta;
// }
// };

// Общие проверки для всей игры
let main_check = Boolean(false)
let level = 1;

// Меню выбора
// Стиль текстов
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
    // Подсчет дистанции звезд относительно камеры
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}


// Создание ракеты
    window.rocket = new PixiApngAndGif(imgs.rocket,resources);
    let startRocket = window.rocket.sprite;
    startRocket.anchor.set(0.5);
    startRocket.x = app.screen.width/3;
    startRocket.y = app.screen.height/1.4;
    startRocket.rotation = 0.5;
    startRocket.scale.set(0.5);
    app.stage.addChild(startRocket);


// Начать игру

const startText = new PIXI.Text('Start', style);
startText.anchor.set(0.5);
startText.scale.set(2);
startText.x = app.screen.width/2;
startText.y = app.screen.height/3.5;
startText.visible = true;
startText.zIndex = 10;
startText.interactive = true;
startText.buttonMode = true;
startText.on('pointerdown', onClickstartText);
app.stage.addChild(startText);
function onClickstartText(){
  main_check = true;
  startText.alpha = 0;
  optionText.alpha = 0;
  startRocket.alpha = 0;
  AlsoGame();
}


// Опции
const optionText = new PIXI.Text('Options', style);
optionText.anchor.set(0.5);
optionText.scale.set(2);
optionText.x = app.screen.width/2;
optionText.y = app.screen.height/2;
optionText.zIndex = 10;
app.stage.addChild(optionText);

// Анимация ракеты
app.ticker.add(() =>{
  startRocket.y -= Math.random() * 2;
  startRocket.x += 0.5;

  if(startRocket.y < -100)
  {
  startRocket.y = app.screen.height;
  startRocket.x = Math.random() * app.screen.width;
  }
})


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
      star.y += 0.01*level;

      // 
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


// Сама игра
function AlsoGame(){
const GameContainer = new PIXI.Container();
GameContainer.visible = true;
app.stage.interactive = true;
app.stage.addChild(GameContainer);
GameContainer.off();



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

var i = 1;  
let timer = 5000;
if(main_check == true)
{        
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
    astro.mass = Math.random()  * 3;
    astro.speed = 1 + Math.random() * level;
    astro.visible = false;
    if(main_check == true)
    {
    astros.push(astro);   
    GameContainer.addChild(astro);
    }
    i++;                   
    if (i < lvltarget) {                 
    AstroLoop();                            
    }                                    
  }, Math.random() * timer)
}
AstroLoop();
}


// Создание взрыва
const texture_boom = PIXI.Texture.from('assets/boom.png')

// Создание пули
const texture2 = PIXI.Texture.from('assets/bullet.png');
const bullet = PIXI.Sprite.from(texture2);
bullet.anchor.set(0.5);
bullet.interactive = true;
bullet.x = app.screen.width/2;
bullet.y = app.screen.height-0.2*app.screen.height;
bullet.scale.set(1.4);
GameContainer.addChild(bullet);

// Создание пулемета
let status = Boolean(false);
const gun = [];
let magazine = 50;
var i = 1; 
if(main_check == true)
{       
function GunLoop () {           
setTimeout(function () { 
  
  const texture2 = PIXI.Texture.from('assets/bulletstorm.png');
  const bullet2 = PIXI.Sprite.from(texture2);
  bullet2.anchor.set(0.5);
  bullet2.tint = 0xFFD300;
  bullet2.scale.set(0.01);
  bullet2.interactive = true;
  bullet2.x = app.screen.width/2;
  bullet2.y = app.screen.height-0.2*app.screen.height;
  bullet2.alpha = 0;
  if(gun.length < 10)
  if(main_check == true)
    {
  gun.push(bullet2)
  GameContainer.addChild(bullet2); 
    }
  i++;                       
    if (i < magazine) {                 
    GunLoop();                           
    }                                    
  }, 2000)
}
GunLoop();
}

// Создание ракеты
window.rocket = new PixiApngAndGif(imgs.rocket,resources);
let bunny = window.rocket.sprite;
bunny.anchor.set(0.5);
bunny.scale.set(0.5);
bunny.x = bullet.x;
bunny.y = bullet.y;
GameContainer.addChild(bunny);
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
GameContainer.addChild(boom);
boomcounter.push(boom);}

// Созднание аптек
const heals = [];
let lvltarget2 = 1000;
var i = 1;      
if(main_check == true)
{               
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
    if(main_check == true)
    {
    heals.push(healpoint);
    GameContainer.addChild(healpoint);;
    }     
    i++;                      
    if (i < lvltarget2) {                 
    HealLoop();                            
    }                                    
  },  Math.random() * (40000 - 10000) + 20000)
}
HealLoop();
}

// Создание магазинов для пулемета
const magazines = [];
let lvltarget3 = 500;
var i = 1;     
if(main_check == true)
{                
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
    if(main_check == true)
    {
    magazines.push(magaz);
    GameContainer.addChild(magaz);
    }          
    i++;                              
    if (i < lvltarget3) {                 
    MagazineLoop();                            
    }                                    
  }, Math.random() * (60000 - 10000) + 20000)
}
MagazineLoop();
}


// Текст в игре

// Стиль Шрифта
const style2 = new PIXI.TextStyle({
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
const basicText = new PIXI.Text('Game Over', style2);
basicText.anchor.set(0.5);
basicText.scale.set(2);
basicText.x = app.screen.width/2;
basicText.y = app.screen.height/3;
basicText.visible = false;
basicText.zIndex = 10;
GameContainer.addChild(basicText);

// Текст очков
let pointtarget = 0;
const pointText = new PIXI.Text(pointtarget, style2);
basicText.fill = ['#ffffff'];
pointText.x = app.screen.width/7;
pointText.y = app.screen.height/6;
pointText.anchor.set(0.5);
pointText.zIndex = 10;
GameContainer.addChild(pointText);

const pointText2 = new PIXI.Text('SCORE:', style2)
pointText2.x = pointText.x - 0.04*app.screen.width;
pointText2.anchor.set(0.5);
pointText2.y = app.screen.height/6;
pointText2.zIndex = 10;
GameContainer.addChild(pointText2);

// Текст жизни
let life = 3;
const lifeText = new PIXI.Text(life, style2);
lifeText.x = app.screen.width/7;
lifeText.y = app.screen.height/5;
lifeText.anchor.set(0.5);
lifeText.zIndex = 10;
GameContainer.addChild(lifeText);

const lifeText2 = new PIXI.Text('TOTAL LIFES:', style2)
lifeText2.x = lifeText.x - 0.06*app.screen.width;
lifeText2.y = app.screen.height/5;
lifeText2.anchor.set(0.5);
lifeText2.zIndex = 10;
GameContainer.addChild(lifeText2);

// Уровни

let scale = 0;
const lvlText = new PIXI.Text('LEVEL', style2)
lvlText.anchor.set(0.5);
lvlText.scale.set(1.5);
lvlText.x = app.screen.width/2;
lvlText.y = app.screen.height/3;
lvlText.alpha = Math.sin(0);
lvlText.zIndex = 10;
GameContainer.addChild(lvlText);

const lvlText2 = new PIXI.Text(level, style2)
lvlText2.anchor.set(0.5);
lvlText2.scale.set(1.5);
lvlText2.x = 200 + lvlText.x;
lvlText2.y = app.screen.height/3;
lvlText2.alpha = Math.sin(0);
lvlText2.zIndex = 10;
GameContainer.addChild(lvlText2);

// Кнопка паузы
let Pause_button = new PIXI.Sprite.from('assets/pause_button.png')
GameContainer.addChild(Pause_button);
Pause_button.scale.set(0.2);
Pause_button.anchor.set(0.5);
Pause_button.alpha = 1;
Pause_button.x = app.screen.width/1.1;
Pause_button.y = app.screen.height/5;
Pause_button.interactive = true;
Pause_button.buttonMode = true;
Pause_button.on('pointerdown', onClickstartPause);


let check_pause = Boolean(true);


function onClickstartPause(){
  if(check_pause == true){
  app.ticker.stop();
  check_pause = false;
  main_check = false;
  console.log("Status",status, "Размер массива обоймы",gun.length,'общая проверка', main_check, 'размер массива астеройдов', astros.length)
  console.log('элемент массива взрыва',m,'булевая',check_boom)
  console.log('таймер',timer);

  }
  else{
  app.ticker.start();
  check_pause = true;
  main_check = true;
  }
}

// Шкала

let ScaleContainer = new PIXI.Container();
GameContainer.addChild(ScaleContainer);
ScaleContainer.x = lifeText.x - 0.26*app.screen.width;;
ScaleContainer.y = app.screen.height/1.2;

let ScaleGunMass = [];
for(let i = 1; i < 2; i++){
let ScaleGun = new PIXI.NineSlicePlane(PIXI.Texture.from('assets/gradient.png'), 10, 10, 10, 10);
ScaleGun.width = 900;
ScaleGun.height = 300;
ScaleGun.scale.set(0.25);
ScaleGunMass.push(ScaleGun);
ScaleContainer.addChild(ScaleGun);
ScaleGun.alpha = 0;
}


  function ScaleTime(){
  for(let i = 0; i<1;i++){
  let ScaleGun = ScaleGunMass[i];
  ScaleGun.alpha = 1;
  if(ScaleGun.width > 0)
  ScaleGun.width -=0.002;}
  
  setTimeout(() => {
    for(let i = 0; i<1;i++){
      let ScaleGun = ScaleGunMass[i];
      ScaleGun.alpha = 0; ScaleGun.width = 900;}},10000)
}
  
// Функция обновления тикера сообщения
function updateStatusMessage(Sometext, sometarget) {
  Sometext.text = sometarget;
}

// Переменная для считываения координат мышки

const mouseCoords = app.renderer.plugins.interaction.mouse.global;

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
    if(timer > 1500){timer -= 450 }},3000)
} 
if(level > 2)
scale = scale + 0.0005;

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
  if(bullet.y < 0){
    bullet.y = app.screen.height-0.2*app.screen.height;
    }
})

// Тикер анимации для метеоритов и других падающих объектов
// Тикер для падения метеоритов
app.ticker.add(() => {
    
    for (let i = 0; i < astros.length; i++) {
    const astro = astros[i];
    const astro2 = astros[i+1]
    Phisicks(astro,astro2)
    let Time = i + Math.random()*400;
    setTimeout(() => meteor_coming(astro, astros),Time);} 
    
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
GameContainer.removeChild(a);
updateStatusMessage(pointText,Math.floor(pointtarget));
}

// Функция исчезновения вещей
function heal_visiblity(c){

  GameContainer.removeChild(c);
  c.interactive = false;
  bunny.tint = 0xFFFFFF;
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
  life = 0;
  updateStatusMessage(lifeText, 0);
  setTimeout(() => {
    boom.visible = false;
  }, 800);
  
  setTimeout(() =>{
  app.stage.removeChild(GameContainer);
  // GameContainer.destroy();
  startText.alpha = 1;
  optionText.alpha = 1;
  startRocket.alpha = 1;
  main_check = false;
},5000)
}
else if(react(a, bunny) && life > 0 && a.interactive == true)
  { 
    bool = 0;
    app.ticker.add(bunny_alpha_animate);
    life -= 0.018;
    setTimeout(() => {bool = 1; bunny.alpha = 1;},2000);
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
  m++;
  if(b.length > 10)
  b.splice(0, 1);
  
  setTimeout(() => {
    boom.visible = false;
  }, 500);
  

if (delta == 0)
  delta += 0.1;
if(m == boomcounter.length-1)
m = 0;
}
if(a.y == app.screen.height - 100)
{
  a.interactive = false;
  app.stage.ticker.stop(a);
  GameContainer.removeChild(a);
  a.destroy();
  b.splice(0, 1);
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
  if (react(a, bullet2) && bullet2.alpha == 1){
    a.texture = texture_boom;
    a.rotation -= Math.random() * 0.05;
    a.scale.set(0.1);
    a.tint = 0xFFFFFF;
    if(b.length > 10)
    b.splice(0, 1);
    setTimeout(() => visiblity(a),200);}
  if(status == true){
  bullet2.alpha = 1;  
  bullet.visible = false;
  ScaleTime();
  setTimeout(() => {
    status = false;
  },10000);
  
}
if(status == false)
{ bullet2.y = bunny.y;
  bullet2.alpha = 0; 
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
  b.splice(0, 1);
}
}

// Создание магазинов в анимации и его реакция на объекты
function magazine_coming(b){
  b.visible = true;
  b.direction += b.turningSpeed * 0.04;
  b.y += Math.random() * b.speed;
  if(react(b, bunny)&&b.interactive == true && life > 0)
    { 
      status = true;
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
}

// Anime.Js Анимации 
});