
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded.");
    const ROOT = document.querySelector("html");
    const canvas = document.querySelector("#maindraw_can");
    const ctx = canvas.getContext("2d");
    console.log(ctx)
    canvas.height = 1500; canvas.width = 1500;
    const canvas_container = document.querySelector("#canvas_outline");
    const curr_pos = {x:canvas_container.offsetWidth / 2, y:canvas_container.offsetHeight / 2}
    // 4 directions strokes
    function stroke_left() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.x += 4 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
        stopleft = requestAnimationFrame(stroke_left)

    }
   function stroke_down() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.y += 4 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
        requestAnimationFrame(stroke_down)
    }
function stroke_right() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.x -= 4 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
        requestAnimationFrame(stroke_right)
    }
   function stroke_up() {
        ctx.beginPath()
        ctx.strokeStyle ='#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.y -= 4
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()

       requestAnimationFrame(stroke_up)
    }


    document.addEventListener("keydown", (event)=> {
        const keyName = event.key;
        console.log(keyName);
        if (keyName == "l") {
            requestAnimationFrame(stroke_left)
        } else if (keyName == "h") {
           requestAnimationFrame(stroke_right)

        } else if (keyName == "k") {

            requestAnimationFrame(stroke_up)
        } else if (keyName == "j") {
            requestAnimationFrame(stroke_down)
        }
    })
   // draw cursor at the current position 
    function cursor_show() {
        ctx.beginPath();
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.moveTo(curr_pos.x-15,curr_pos.y);
        ctx.lineTo(curr_pos.x+15,curr_pos.y);
        ctx.moveTo(curr_pos.x,curr_pos.y-15);
        ctx.lineTo(curr_pos.x,curr_pos.y+15);
        ctx.stroke();
        requestAnimationFrame(cursor_show)
    }
cursor_show();
requestAnimationFrame(cursor_show)
});
