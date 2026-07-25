// now how are you going to DRAW ? LOL FIRSTLY HOW IT SHOULD WORK ? 
//
//
//
//
// firstly : a pointer which can be moved so smoothly + it can be drawing as well if pressed shift (LEAVING A TRACE! )


// how to have a hovering pointer over the screen // basically store the current mouse position HOW ? relative to the (0,0) 
// so make 0,0 the initial position which is total width by 2 and total height by 2 AND HOW ABOUT When 
//
//
//
// So first of all 
//
//
//
// initial position set :/
// set current position as initial position
// on W A S D move the current position 
// if SHIFT is pressed : draw the line 
// Keep a cursor DRAWING ON THE CURRENT MOUSE POSITION
//
//
const root_element = document.querySelector("html");
initial_reference_x = root_element.clientWidth;
initial_reference_y = root_element.clientHeight;
let ref_pos = {
    "x": initial_reference_x,
    "y": initial_reference_y };

let curr_mouse_pos = ref_pos;


root_element.addEventListener("keydown", onkeypress);


function onkeypress(e) {
    console.log("DJ")
if (e.ctrlKey) {
    if (e.key == 'L') {
        console.log("ctol L ")
    }
} else {
    if (e.key == "L" || e.key == "l") {
    console.log("L")
    }
}


};
