
document.addEventListener("DOMContentLoaded", function () {
    console.log("WE ROCKED")
    // elements
    const ROOT = document.querySelector("html");
    const canvas = document.querySelector("#maindraw_can");
    const point_canvas = document.querySelector("#point_can")

    // canvas
    const ptx = point_canvas.getContext("2d");
    const ctx = canvas.getContext("2d");
    canvas.height = 1500; canvas.width = 1500;
    point_canvas.height = 1500; point_canvas.width = 1500;
    const canvas_container = document.querySelector("#canvas_outline");

    const init_pos = {x: null, y:null}
    const curr_pos = {x:canvas_container.offsetWidth / 2, y:canvas_container.offsetHeight / 2}
    const fin_pos = {x: null, y: null}
    let text_pos = {x:null, y:null}

    let state = "NORMAL"

    let strokes_st = [];
    let strokes_end = [];
    let texts = [] 
    let trash_st = [];
    let trash_end = [];
    class text {
        constructor(text_content,x,y) {
            this.x = x;
            this.y = y;
            this.text_content = text_content;
        }
    }

    function insert_mode() {
       ptx.clearRect(0, 0, canvas.width, canvas.height) 
       for (let i = 0; i < strokes_st.length; i++) {
           ptx.beginPath()
       ptx.moveTo(strokes_st[i].x,strokes_st[i].y)
       ptx.lineTo(strokes_end[i].x, strokes_end[i].y)
       ptx.stroke() 
       for (let l = 0; l < texts.length; l++) {
           ptx.fillText(texts[l].text_content,texts[l].x, texts[l].y)
       }
       }
    }
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
            text_box.addEventListener("keydown", (e)=> {
             e.stopPropagation()
                if (e.key == "Enter") {
                    state = "NORMAL"
                    text_mode()
                }
            })
            text_box.focus()
        }
        else {
            const text_box = document.querySelector("textarea")
            ptx.font = "12px serif";
            val = text_box.value
            ptx.fillText(val, text_pos.x, text_pos.y)
            text_box.remove()
            const text_elem = new text(val,text_pos.x, text_pos.y)
            texts.push(text_elem)

        }
    }
    function save_state() {
        const data = {
            strokes_st: strokes_st,
            strokes_end: strokes_end,
            texts: texts,
        }
        localStorage.setItem("data", JSON.stringify(data))
        console.log(JSON.stringify(data))
    }

    function load_data() {
        const data_str = localStorage.getItem("data")
        if (!data_str) return;
        const data = JSON.parse(data_str)
        strokes_st = data.strokes_st
        strokes_end = data.strokes_end
        texts = data.texts
        insert_mode() 
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
// precision movement functions
    function p_stroke_left() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.x -= 1 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()

    }
   function p_stroke_down() {
        ctx.beginPath()

        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.y += 1
         ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
function p_stroke_right() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.x += 1 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
   function p_stroke_up() {
        ctx.beginPath()
        ctx.strokeStyle ='#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.y -= 1
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

if (keysDown.has("H")) {
            p_stroke_left()
        }
        if (keysDown.has("L")) {
            p_stroke_right()
        }
        if (keysDown.has("J")) {
            p_stroke_down()
        }
        if (keysDown.has("K")) {
            p_stroke_up()
        }
         
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
        if (state === "INSERT") {
            e.preventDefault;
            return;
        }
        e.preventDefault();
        state = "TEXT"
        text_mode()
    }
    if (e.key == "w" && state !== "TEXT") {
        save_state()
    } else if (e.shiftKey && e.key.toLowerCase() == "w"  && state !== "TEXT") {
        load_data()
    }
    if (e.key == "u" && state === "NORMAL") {
        trash_st.push(strokes_st.pop())
        trash_end.push(strokes_end.pop())
        insert_mode()
    }
   if (e.shiftKey && e.key.toLowerCase() === "r" && state === "NORMAL"){
        strokes_st.push(trash_st.pop())
        strokes_end.push(trash_end.pop())
       insert_mode()
    }
})

requestAnimationFrame(update_draw)
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
