
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded.");
    const ROOT = document.querySelector("html");
    const canvas = document.querySelector("#maindraw_can");
    const point_canvas = document.querySelector("#point_can")
    const ptx = point_canvas.getContext("2d");
    const ctx = canvas.getContext("2d");
    console.log(ctx)
    canvas.height = 1500; canvas.width = 1500;
    point_canvas.height = 1500; point_canvas.width = 1500;
    const init_pos = {x: null, y:null}
    const canvas_container = document.querySelector("#canvas_outline");
    const curr_pos = {x:canvas_container.offsetWidth / 2, y:canvas_container.offsetHeight / 2}
    let state = "NORMAL"
    const fin_pos = {x: null, y: null}
    let strokes_st = [];
    let strokes_end = [];
    let trash_st = [];
    let trash_end = [];
    let text_pos = {x:null, y:null}
    let texts = [] 
    class text {
        constructor(text_content,x,y) {
            this.x = x;
            this.y = y;
            this.text_content = text_content;
        }
    }
    function insert_mode() {
       console.log(strokes_st.length)
       ptx.clearRect(0, 0, canvas.width, canvas.height) 
        console.log(strokes_st)
       for (let i = 0; i < strokes_st.length; i++) {
           ptx.beginPath()
        console.log(`start :${strokes_st[i].x} ${strokes_st[i].y} end:${strokes_end[i].x} `)
       ptx.moveTo(strokes_st[i].x,strokes_st[i].y)
       ptx.lineTo(strokes_end[i].x, strokes_end[i].y)
       ptx.stroke() 
       for (let i = 0; i < texts.length; i++) {
           ptx.fillText(texts[i].text_content,texts[i].x, texts[i].y)
           console.log(texts[i])
           console.log(texts)
       }
       }
    }
    // text box this is how i m going to make this literally to be honest just make it usable with mobile 
    // save feature and 
    // my personal website and yeah ease of access

    function text_mode() {
        if (state == "TEXT") {
            const text_box = document.createElement("textarea")
            text_box.placeholder = "Enter Your Text Here"
            text_box.style.position = "absolute"
            text_pos.x = curr_pos.x
            text_pos.y = curr_pos.y
            text_box.style.top = `${text_pos.y}px`
            text_box.style.left = `${text_pos.x}px`
            text_box.style.zIndex = "3"
            canvas_container.appendChild(text_box)
            text_box.focus()
        }
        else {
            const text_box = document.querySelector("textarea")
            ptx.font = "18px serif";
            val = text_box.value
            ptx.fillText(val, text_pos.x, text_pos.y)
            text_box.remove()
            const text_elem = new text(val,text_pos.x, text_pos.y)
            texts.push(text_elem)

        }
    }

    // 4 directions strokes
    function stroke_left() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.x -= 14 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()

    }
   function stroke_down() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.y += 14 
         ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
function stroke_right() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.x += 14 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
   function stroke_up() {
        ctx.beginPath()
        ctx.strokeStyle ='#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.y -= 14
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
        }
        requestAnimationFrame(update_draw);
    }

// insert key press 
document.addEventListener("keydown", (e) => {
    if (e.key == "i" && state == "NORMAL") {
        state = "INSERT"
        init_pos.x = curr_pos.x;
        init_pos.y = curr_pos.y;
        strokes_st.push({x: curr_pos.x, y: curr_pos.y})
    } else if (e.key == "i" && state == "INSERT") {
        state = "NORMAL"
        strokes_end.push({x:curr_pos.x,y:curr_pos.y})
        insert_mode()
    }
    if (e.key == "t" && state !== "TEXT") {
        e.preventDefault();
        state = "TEXT"
        text_mode()
    } else if(e.key == "Enter" && state === "TEXT") {
        state = "NORMAL"
        text_mode()
    } 
    

    if (e.key == "u") {
        trash_st.push(strokes_st.pop())
        trash_end.push(strokes_end.pop())
        insert_mode()
    }
   if (e.shiftKey && e.key.toLowerCase() === "r"){
        strokes_st.push(trash_st.pop())
        strokes_end.push(trash_end.pop())
       insert_mode()
    }
})


// undo button bro LOl 
requestAnimationFrame(update_draw)
   // draw cursor at the current position along with shallow insert mode line 
    function cursor_show() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
 if (state == "INSERT") {
        
               ctx.beginPath()
        ctx.strokeStyle = "grey"
        ctx.arc(init_pos.x,init_pos.y, 1.5, 0, 2 * Math.PI)
        ctx.arc(curr_pos.x,curr_pos.y, 1.5, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.strokeStyle = "grey"
        ctx.moveTo(init_pos.x,init_pos.y)
        ctx.lineTo(curr_pos.x,curr_pos.y)
        ctx.stroke()
        }
        ctx.beginPath();
        ctx.lineWidth = 2.44;
        ctx.strokeStyle = '#00FF00';
        ctx.moveTo(curr_pos.x-6,curr_pos.y);
        ctx.lineTo(curr_pos.x+6,curr_pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2.44;
        ctx.moveTo(curr_pos.x,curr_pos.y-6);
        ctx.lineTo(curr_pos.x,curr_pos.y+6);
        ctx.stroke()
        requestAnimationFrame(cursor_show)

    }
cursor_show();
requestAnimationFrame(cursor_show)
});


// i mean right now i need to take two points and then draw a good line lol AND ADD THE CURRENT MODE AS WELl  
// so basically showing the pointer at the current position and then clearing canvas and redrawing on each change and also making a pseudo line and then literally drawing that line 
