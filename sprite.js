function loadImage(url) {
    return new Promise( (resolve, reject) => {
    let img = new Image();
    img.addEventListener("error", () => {
      reject("error loading " + url);
    });
    img.addEventListener("load", () => {
      resolve(img);
    });
  
    img.src = url;
    });
};
  
async function loadImageToCanvas(url) {

    let image = await loadImage(url);
    let width = image.width;
    let height = image.height;
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    return canvas;
  };

let url = document.location.href;
let classe = url.substr(url.lastIndexOf("player=")+7);
let forward_tab = [];
let backward_tab = [];
let left_tab = [];
let right_tab = [];
let loose_tab = [];
let victory_tab = [];
let sprites_bomb = [];
let background_sprites = [];
let block_sprites = [];
let victory_sprites = [];
let tree_sprites;
let explosion_sprites = [];

async function load_tabs () {
    for(let i=0; i<9; i++){
        forward_tab.push( await loadImageToCanvas("sprites/"+classe+"/forward"+i+".png"));
        backward_tab.push(await loadImageToCanvas("sprites/"+classe+"/backward"+i+".png"));
        left_tab.push(await loadImageToCanvas("sprites/"+classe+"/left"+i+".png"));
        right_tab.push(await loadImageToCanvas("sprites/"+classe+"/right"+i+".png"));
        loose_tab.push(await loadImageToCanvas("sprites/"+classe+"/fall"+i+".png"));
        victory_tab.push(await loadImageToCanvas("sprites/"+classe+"/victory"+i+".png"));
    }
    sprites_bomb = await Promise.all([loadImageToCanvas("sprites/decor/bomb0.png"), loadImageToCanvas("sprites/decor/bomb1.png")]);
    background_sprites = await Promise.all([loadImageToCanvas("sprites/decor/map.png"),loadImageToCanvas("sprites/decor/win.png"),loadImageToCanvas("sprites/"+classe+"/loose.png")]);
    block_sprites = await loadImageToCanvas("sprites/decor/block.png");
    tree_sprites = await loadImageToCanvas("sprites/decor/tree.png");
    victory_sprites = await Promise.all([loadImageToCanvas("sprites/decor/victory0.png"), loadImageToCanvas("sprites/decor/victory1.png")]);
    explosion_sprites = await Promise.all([loadImageToCanvas("sprites/decor/explosion0.png"),loadImageToCanvas("sprites/decor/explosion1_h.png"),loadImageToCanvas("sprites/decor/explosion1_w.png"),
    loadImageToCanvas("sprites/decor/explosion2_u.png"),loadImageToCanvas("sprites/decor/explosion2_d.png"),loadImageToCanvas("sprites/decor/explosion2_l.png"),
    loadImageToCanvas("sprites/decor/explosion2_r.png")]);
}