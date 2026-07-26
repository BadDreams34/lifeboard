
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded.");
    const ROOT = document.querySelector("html");
    const canvas = document.querySelector("#maindraw_can");
    const point_canvas = document.querySelector("#point_can")
    const ptx = canvas.getContext("2d");
    const ctx = canvas.getContext("2d");
    console.log(ctx)
    canvas.height = 1500; canvas.width = 1500;
    point_canvas.height = 1500; point_canvas.width = 1500;
    
    const canvas_container = document.querySelector("#canvas_outline");
    const curr_pos = {x:canvas_container.offsetWidth / 2, y:canvas_container.offsetHeight / 2}

    // insert_initial node and shading reference grey line
    function insert_mode() {
        ptx.beginPath()
        ptx.arc(curr_pos.x,curr_pos.y, 3.5, 0, 2 * Math.PI)
        console.log(curr_pos.x)
        ptx.stroke()
    }




    // 4 directions strokes
    function stroke_left() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.x -= 4 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()

    }
   function stroke_down() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.y += 4 
         ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
function stroke_right() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.x += 4 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
   function stroke_up() {
        ctx.beginPath()
        ctx.strokeStyle ='#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.y -= 4
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()

       
    }

    const keysDown = new Set();

    document.addEventListener("keydown", (event)=> {
        const keyName = event.key;
        keysDown.add(keyName)
            })
document.addEventListener("keyup", (event) => {
    keysDown.delete(event.key);
});
    function update_draw() {
        if (keysDown.has("h")) {
            stroke_left()
        }
        if (keysDown.has("l")) {
            stroke_right()
        }
        if (keysDown.has("j")) {
            stroke_down()
        }
        if (keysDown.has("k")) {
            stroke_up()
        } if (keysDown.has("i")) {
            insert_mode()
        }

        requestAnimationFrame(update_draw)
    }
requestAnimationFrame(update_draw)
   // draw cursor at the current position 
    function cursor_show() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 2.44;
        ctx.strokeStyle = '#00FF00';
        ctx.moveTo(curr_pos.x-6,curr_pos.y);
        ctx.lineTo(curr_pos.x+6,curr_pos.y);
        console.log(curr_pos.x,curr_pos.y)
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2.44;
        ctx.moveTo(curr_pos.x,curr_pos.y-6);
        ctx.lineTo(curr_pos.x,curr_pos.y+6);
        ctx.stroke();
        requestAnimationFrame(cursor_show)
    }
cursor_show();
requestAnimationFrame(cursor_show)
});


// i mean right now i need to take two points and then draw a good line lol AND ADD THE CURRENT MODE AS WELl  
// so basically showing the pointer at the current position and then clearing canvas and redrawing on each change and also making a pseudo line and then literally drawing that line 
