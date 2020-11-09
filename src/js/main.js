import * as PIXI from 'pixi.js'
import anime from 'animejs/lib/anime.es.js';

const app = new PIXI.Application({
width: screen.width,
height: screen.height,
backgroundColor: 0x1099bb,
view: document.querySelector('#scene'),
resolution: window.devicePixelRatio || 1
});

const astros = [];
const texture_boom = PIXI.Texture.from('assets/boom.png')
const boom = new PIXI.Sprite(texture_boom);
const texture = PIXI.Texture.from('assets/bunny.png');
const bunny = new PIXI.Sprite(texture);
bunny.anchor.set(0.5);
bunny.x = screen.width/2;
bunny.y = screen.height-200;
app.stage.addChild(bunny);
const texture2 = PIXI.Texture.from('assets/bullet.png');
const bullet = PIXI.Sprite.from(texture2);
bullet.anchor.set(0.5);
bullet.interactive = true;
bullet.x = bunny.x;
bullet.y = bunny.y;
app.stage.addChild(bullet);
const target = new PIXI.Point();
for (let i = 0; i < 10; i++) {
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
astros.push(astro);
// astro.on('added', () => {
// if(astro.x == bullet.x && astro.y == bullet.y)
// astro.texture = texture_boom;
// })
app.stage.addChild(astro);
}

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

let astroinvis= [];
for (let i = 0; i < astros.length; i++) {
const astro = astros[i];
astro.direction += astro.turningSpeed * 0.04;
astro.rotation += Math.random() * 0.05;
astro.y += Math.random() * astro.speed;
astro.interactive = true;
if (react(astro, bullet)){
astro.texture = texture_boom;
astro.scale.set(0.1);
astro.tint = 0xFFFFFF;
setTimeout(() => visiblity(astro),500);
astroinvis.push(astro);

}
// if(react(astro, bunny)){
// bunny.texture = texture_boom;
// bunny.scale.set(0.1);
// bunny.tint = 0xFFFFFF;
// setTimeout(() => visiblity(bunny),500);
// app.ticker.stop();
// }
}

if(astros.length == astroinvis.length){
astroinvis.length = 0;
for (let i = 0; i < astros.length; i++) {
const astro = astros[i];
astro.direction += astro.turningSpeed * 0.04;
astro.rotation += Math.random() * 0.05;
astro.y += Math.random() * astro.speed;
astro.interactive = true;
if (react(astro, bullet)){
astro.texture = texture_boom;
astro.scale.set(0.1);
astro.tint = 0xFFFFFF;
setTimeout(() => visiblity(astro),500);
astroinvis.push(astro);
}
if(react(astro, bunny)){
bunny.texture = texture_boom;
bunny.scale.set(0.1);
bunny.tint = 0xFFFFFF;
setTimeout(() => visiblity(bunny),500);
app.ticker.stop();
}
}
}

});

// функция исчезновения объекта
function visiblity(a)
{a.visible = false;
app.stage.removeChild(a);
return a;
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

function astroscreate(){
let astroinvis= [];
for (let i = 0; i < astros.length; i++) {
const astro = astros[i];
astro.direction += astro.turningSpeed * 0.04;
astro.rotation += Math.random() * 0.05;
astro.y += Math.random() * astro.speed;
astro.interactive = true;
if (react(astro, bullet)){
astro.texture = texture_boom;
astro.scale.set(0.1);
astro.tint = 0xFFFFFF;
setTimeout(() => visiblity(astro),500);
astroinvis.push(astro);
}
if(react(astro, bunny)){
bunny.texture = texture_boom;
bunny.scale.set(0.1);
bunny.tint = 0xFFFFFF;
setTimeout(() => visiblity(bunny),500);
app.ticker.stop();
}
}
}





