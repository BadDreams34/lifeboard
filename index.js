
document.addEventListener("DOMContentLoaded", function () {
    const ROOT = document.querySelector("html");
    const canvas = document.querySelector("#maindraw_can");
    const point_canvas = document.querySelector("#point_can")
    const offset = {x: 0, y:0}
    const status_tab = document.querySelector("#stat_curr")
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

    // functions 
    function insert_mode() {
       ptx.setTransform(1,0,0,1, 0,0) 
       ptx.clearRect(0, 0, canvas.width, canvas.height) 
       ptx.setTransform(1,0,0,1, offset.x, offset.y) 
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
        console.log(state)
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
            ptx.fillText(val, text_pos.x - offset.x, text_pos.y - offset.y)
            text_box.remove()
            const text_elem = new text(val,text_pos.x - offset.x , text_pos.y - offset.y)
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
        curr_pos.x -= 5
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }

   function stroke_down() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
        curr_pos.y += 5 
         ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()

    }
function stroke_right() {
        ctx.beginPath()
        ctx.strokeStyle = '#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.x += 5 
        ctx.lineTo(curr_pos.x, curr_pos.y)
        ctx.stroke()
        ctx.closePath()
    }
   function stroke_up() {
        ctx.beginPath()
        ctx.strokeStyle ='#36454F';
        ctx.lineTo(curr_pos.x, curr_pos.y)
         curr_pos.y -= 5 
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
    function update_draw() {
       if (state === "MOVE") {
            if (keysDown.has("h")) {move_can("l")}
            if (keysDown.has("j")) {move_can("k")}
            if (keysDown.has("k")) {move_can("j")}
            if (keysDown.has("l")) {move_can("h")}
        }
        else if (state === "NORMAL" || state === "INSERT") {
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
        } 
      requestAnimationFrame(update_draw);
    }


    // event listeners
    document.addEventListener("keydown", (event)=> {
        const keyName = event.key;
        keysDown.add(keyName)
            })
    document.addEventListener("keyup", (event) => {
    keysDown.delete(event.key);
            });


// insert key press 
document.addEventListener("keydown", (e) => {
    if (e.key == "i" && state == "NORMAL") {
        state = "INSERT"
        init_pos.x = curr_pos.x;
        init_pos.y = curr_pos.y;
        strokes_st.push({x: curr_pos.x - offset.x, y: curr_pos.y - offset.y})
    } else if (e.key == "i" && state == "INSERT") {
        state = "NORMAL"
        strokes_end.push({x:curr_pos.x - offset.x ,y:curr_pos.y - offset.y})
        insert_mode()
    }
    if (e.key == "m" && state === "NORMAL") {
        state = "MOVE"
    } else if (e.key == "m" && state === "MOVE") {
        state = "NORMAL"
    }
    if (e.key == "t" && state !== "TEXT") {
        if (state === "INSERT") {
            e.preventDefault;
        } else {
        e.preventDefault();
        
        state = "TEXT"
        text_mode()

        }
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

    function move_can(key) {
let moved = false;
        if (key === "l") {offset.x += 10; moved = true }
        if (key === "k") { offset.y -= 10; moved = true }
        if (key === "j") { offset.y += 10; moved = true }
        if (key === "h") { offset.x -= 10; moved = true }
        if (moved) {
            insert_mode()
        }
    }
        
    // mobile handling
    const H_key = document.querySelector("#H_key")
    const J_key = document.querySelector("#J_key")
    const K_key = document.querySelector("#K_key")
    const L_key = document.querySelector("#L_key")
    const h_key = document.querySelector("#h_key")
    const j_key = document.querySelector("#j_key")
    const k_key = document.querySelector("#k_key")
    const l_key = document.querySelector("#l_key")
    const i_key = document.querySelector("#i_key")
    const t_key = document.querySelector("#t_key")
    const u_key = document.querySelector("#u_key")
    const r_key = document.querySelector("#r_key")
    const w_key = document.querySelector("#w_key")
    const W_key = document.querySelector("#W_key")


    i_key.addEventListener("pointerdown", (e)=> {
if (state == "NORMAL") {
        state = "INSERT"
        init_pos.x = curr_pos.x;
        init_pos.y = curr_pos.y;
        strokes_st.push({x: curr_pos.x, y: curr_pos.y})
    } else if (state == "INSERT") {
        state = "NORMAL"
        strokes_end.push({x:curr_pos.x,y:curr_pos.y})
        insert_mode()
    }
    })
    t_key.addEventListener("pointerdown", (e)=> {
     if (state !== "text") {
        if (state === "insert") {
            e.preventDefault;
            return;
        }
       e.preventDefault();
        state = "TEXT"
        text_mode()
    }
        })
    w_key.addEventListener("pointerdown", (e)=> {
       if (state !== "TEXT") {
save_state()
       }

    })
    W_key.addEventListener("pointerdown", (e)=> {
       if (state !== "TEXT") {
        load_data()
       }
    })


    u_key.addEventListener("pointerdown", (e)=> {
        if (state === "NORMAL") {
        trash_st.push(strokes_st.pop())
        trash_end.push(strokes_end.pop())
        insert_mode()
        }
       })

r_key.addEventListener("pointerdown", (e)=> {
    if (state === "NORMAL") {
        strokes_st.push(trash_st.pop())
        strokes_end.push(trash_end.pop())
        insert_mode()
    }
        })

    h_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("h")
    })
     j_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("j")
    })
     k_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("k")
    })
     l_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("l")
    })

     h_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("h")
    })
     j_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("j")
    })
     k_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("k")
    })
     l_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("l")
    })
H_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("H")
    })
     J_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("J")
    })
     K_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("K")
    })
     L_key.addEventListener("pointerdown", (e)=> {
        keysDown.add("L")
    })

     H_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("H")
    })
     J_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("J")
    })
     K_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("K")
    })
     L_key.addEventListener("pointerup", (e)=> {
        keysDown.delete("L")
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
        status_tab.innerText = state
        if (state === "NORMAL") {
            status_tab.style.backgroundColor = "white"
            status_tab.style.color = "black"

        }  else if (state === "INSERT") {
            status_tab.style.backgroundColor = "darkgrey"
            status_tab.style.color = "white"
        } else if (state === "TEXT") {
            status_tab.style.backgroundColor = "#007373"
            status_tab.style.color = "white"
            } else if (state === "MOVE") {
                status_tab.style.backgroundColor = "darkseagreen"

                status_tab.style.color = "white"
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
