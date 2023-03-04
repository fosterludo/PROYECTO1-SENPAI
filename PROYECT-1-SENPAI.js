let user_name_input = document.querySelector("form #name");
let user_number_input = document.querySelector("form #number");
let user_month_input = document.querySelector("form #month");
let user_year_input = document.querySelector("form #year");
let user_cvc_input = document.querySelector("form #cvc");
let name_displayer = document.querySelector(".personal .name");
let number_displayer = document.querySelector(".card_front_info .card_number");
let month_displayer = document.querySelector(".birth .month");
let year_displayer = document.querySelector(".birth .year");
let cvc_displayer = document.querySelector(".card_back p");
let form_parent = document.querySelector(".user_info");
let main = document.querySelector("main");

let confirm = document.querySelector("#confirm");


let user_name_input_object = {
    user_value: "",
    regex :/^(_|$)?[a-zA-Z]{3,}(\s|_)?([a-zA-Z]+)?$/ ,
    min_length:4,
    wrong_message : "at least 4 chars",
    type :"letters",
    def : "Jane Appleseed",
}
let user_number_input_object = {
    user_value: "",
    regex :/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/ ,
    min_length:19,
    wrong_message : "please enter right card number",
    type :"numbers",
}
let user_month_input_object = {
    user_value: "",
    regex :/^[0-9]{2}$/ ,
    min_length:2,
    wrong_message : "follow this ex : 09",
    type :"numbers",
    def :"00"
}
let user_year_input_object = {
    user_value: "",
    regex :/^[0-9]{2}$/ ,
    min_length:2,
    wrong_message : "follow this ex : 23",
    type :"numbers",
    def:"00"
}
let user_cvc_input_object = {
    user_value: "",
    regex :/^[0-9]{3}$/ ,
    min_length:3,
    wrong_message : "Invaild",
    type :"numbers",
    def:"000"
}
let inputs = [[user_name_input,user_name_input_object,name_displayer ], 
                [user_number_input,user_number_input_object , number_displayer],
                [user_month_input, user_month_input_object , month_displayer],
                [user_year_input ,user_year_input_object , year_displayer],
                [user_cvc_input , user_cvc_input_object , cvc_displayer]
            ];
// nombre de usuario
inputs.forEach((input)=>{
        input[0].addEventListener("input",()=>{
        input[1].user_value = input[0].value;
    });
})

// validacion
function vaild_or_not (p){
    if (p[1].user_value.length == 0){
        p[0].style.border = "1px solid red"
       p[0].nextElementSibling.innerText = "Can't be blank"
    }
    else if (p[1].user_value.length < p[1].min_length){
        p[0].style.border = "1px solid red";
        p[0].nextElementSibling.innerText = `${p[1].wrong_message}`
    }
    else if (p[1].regex.test(p[1].user_value) == true){
        p[0].nextElementSibling.innerText = "";
        console.log("vaild")
    }
    else {
        p[0].style.border = "1px solid red";
        p[0].nextElementSibling.innerText = `wrong format , ${p[1].type} only`
    }
}

// mostrar valores
function show (p){
    if (p[1].user_value.length != 0 ){
        p[2].innerText = p[1].user_value;
    }
    else {
        p[2].innerText = p[1].def;
    }
}
function number (p){
    if (p[1].user_value.length != 0 ){
        let s = p[1].user_value.split(" ");
        p[2].innerHTML = `
        <span>${typeof s[0] == "undefined" ? "0000" : s[0].length == 4 ?  s[0] : "0000"}</span>
        <span>${typeof s[1] == "undefined" ? "0000" : s[1].length == 4 ?  s[1] : "0000"}</span>
        <span>${typeof s[2] == "undefined" ? "0000" : s[2].length == 4 ?  s[2] : "0000"}</span>
        <span>${typeof s[3] == "undefined" ? "0000" : s[3].length == 4 ?  s[3] : "0000"}</span>
        `
    }
    else{
        p[2].innerHTML = `
        <span>0000</span>
        <span>0000</span>
        <span>0000</span>
        <span>0000</span>
        `
    }
}

confirm.addEventListener("click",(e)=>{
    e.preventDefault();
    inputs.forEach((input)=>{
    vaild_or_not(input)
})
    inputs.forEach((input)=>{
        if (inputs.indexOf(input) == 1){
            number(input);
        }
        else{
            show(input);
        }
})
    let res = inputs.every((input)=>{
        return (input[0].nextElementSibling.innerText == "")
    })
   if (res){
        main.classList.add("complete_main")
        form_parent.classList.add("complete")
        form_parent.innerHTML = `
        <img src="./images/icon-complete.svg" alt="complete photo" class = "complete_img">
        <h1 class = "complete_h">Thank you!</h1>
        <p class = "complete_p">We've added your card details</p>
        <button>Continue</button>
        `
   }
})