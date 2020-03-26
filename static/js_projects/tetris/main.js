/**@type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

let c_index = 2

const colors = [
    'red',
    '#E04230',
    'yellow',
    'green',
    'blue',
    'violet',
    '#744AF6',
    'pink'
]


const collides = (arena,player) => {
    const [m,o] = [player.matrix,player.pos];
    for(let y=0;y < m.length; ++y){
        for(let x=0; x < m[y].length;++x){
            if(
                m[y][x] !== 0 &&
                (arena[y+o.y] && arena[y+o.y][x+o.x]) !== 0
            ){
                return true;
            }
        }
    }
    return false;
}

//creates a grid of matrices
const createMatrix = (w,h) => {
    const matrix = [];
    while(h--){
        matrix.push(new Array(w).fill(0))
    }
    return matrix
}

//create the pieces for player
const createPieces = (type) =>{
    switch(type){
        case 'T':
            return [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ];
        case 'O':
            return[
                [2,2],
                [2,2]
            ]
        case 'L':
            return[
                [0,3,0],
                [0,3,0],
                [0,3,3]
            ]
        case 'J':
            return[
                [0,4,0],
                [0,4,0],
                [4,4,0]
            ]
        case 'I':
            return [
                [0,5,0,0],
                [0,5,0,0],
                [0,5,0,0],
                [0,5,0,0]
            ]
        case 'S':
            return[
                [0,6,6],
                [6,6,0],
                [0,0,0]
            ]
        case 'Z':
            return[
                [7,7,0],
                [0,7,7],
                [0,0,0]
            ]
    }
}

//copies all the values of player into the arena
const merge = (arena,player) =>{
    player.matrix.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value !== 0){
                arena[y + player.pos.y][x + player.pos.x] = value
            }
        })
    })
}

//this represent our tetris title
const player = {
    matrix:null,
    pos:{x:0,y:0}
}



const playerReset = () => {
    const types = 'ILJOTSZ';
    player.matrix = createPieces(types[types.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x =(arena[0].length/2 | 0) - (player.matrix[0].length/2 | 0);

    if(collides(arena,player)){
        arena.forEach(row=>row.fill(0));
    }
}

//this represent that arena we will be playing on
const arena = createMatrix(12,20);

//clear completed level
const arenaSweep = () => {
    outer: for(let y = arena.length-1;y >= 0;--y){
        for(let x=0;x < arena[y].length;++x){
            if(arena[y][x] === 0){
                continue outer;
            }
        }
        const row = arena.splice(y,1)[0].fill(0);
        arena.unshift(row);
        ++y;
    }
}

//draw everything to screen
const drawEverything = () =>{
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width,canvas.height)

    drawMatrix(arena,{x:0,y:0});
    drawMatrix(player.matrix,player.pos)
}

//draw a small cell
const drawRect = (left,top,width,height,drawColor) =>{
    context.fillStyle = `${drawColor}`;
    context.fillRect(left,top,width,height);

    // context.fillStyle = drawColor ;
    // context.fillRect(left,top,width,height);
}

//draw a matrix
const drawMatrix = (matrix,offset,color="red") => {
    
    matrix.forEach((row,y)=>{
        row.forEach((value,x)=>{
            console.log(value,x,"from inner loop")
            if(value !== 0){
                drawRect(x+offset.x,y+offset.y,1,1,colors[value])
            }
        })
    })
}

//rotate player
const rotate = (matrix,dir) =>{
    for(let y=0;y<matrix.length; ++y){
        for(let x =0;x < y;++x){
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ]
        }
    }

    if(dir > 0){
        matrix.forEach(row => row.reverse());
    }else{
        matrix.reverse()
    }
}

const playerRotate = (dir) =>{
    let offset = 1;
    rotate(player.matrix,dir);

    while(collides(arena,player)){
        const posX = player.pos.x;
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));

        if(offset > player.matrix[0].length){
            rotate(player.matrix,-dir);
            player.pos.x = posX;
            return;
        }
    }
}

//update game
const update = (time = 10) => {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if(dropCounter > dropInterval){
        dropDown();
    }

    drawEverything();
    requestAnimationFrame(update);
}

//move player sideways
const playerMove = (dirs) =>{
    player.pos.x += dirs;
    if(collides(arena,player)){
        player.pos.x -= dirs;
    }
}

//move tetris down
const dropDown = () => {
    player.pos.y += 1;

    if(collides(arena,player)){
        player.pos.y -= 1;
        merge(arena,player);
        playerReset();
        arenaSweep();
    }

    dropCounter = 0;
}

//handle user inputs
const handleKeyInput = (e) =>{
    switch(e.keyCode){
        case 37:
            playerMove(-1);
            break;
        case 39:
            playerMove(1);
            break;
        case 40:
            dropDown();
            break;
        case 81:
            playerRotate(1);
            break;
        case 87:
            playerRotate(-1);
            break;
        default:
            console.log('key not recognized')
    }
}


window.addEventListener('load',(e)=>{
    context.scale(20,20);
    playerReset();
    update();
    document.addEventListener('keydown',handleKeyInput);
});