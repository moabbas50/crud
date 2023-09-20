let title =document.querySelector("#title");
let allcost = document.querySelectorAll("#allcost input");
let count = document.querySelector("#count");
let depart = document.querySelector("#depart");
let cbtn = document.querySelectorAll(".btn");
let tbody = document.querySelector("#tbody");
let allspan = document.querySelectorAll(".invalid");
let allspaninvaled = document.querySelectorAll(".invalid-number");
let numbinputt =document.querySelectorAll(".numberin"); 
let allinput = document.querySelectorAll("input");
let mood = "creat";
let indexid ;


let products =[];
  
let validationState1 = false ;
let validationState2 = false ;

for(let i=0 ; i < allinput.length ; i++ ){
    allinput[i].addEventListener("keyup",()=>{
         if(allinput[i].value == "" ){
    allspan[i].classList.remove("invalid");
    allinput[i].classList.add("invalid-span"); 
    validationState1 = false;
         }else{
            allspan[i].classList.add("invalid");
            allinput[i].classList.remove("invalid-span");    
            validationState1 = true;
         }
     })
 }
 
 for(let i=0 ; i < numbinputt.length ; i++ ){
    numbinputt[i].addEventListener("keyup",()=>{
         if(numbinputt[i].value < 0 ){
           allspaninvaled[i].classList.remove("invalid-number");
           numbinputt[i].classList.add("invalid-span"); 
           validationState2 = false;
         }else{
            allspaninvaled[i].classList.add("invalid-number");
            numbinputt[i].classList.remove("invalid-span");  
            validationState2 = true;  
         }
     })
 }
if(localStorage.products!= null){
    products = JSON.parse(localStorage.products);
}
else{  
    products =[];   
}

for(i=0;i<allcost.length ;i++){
    allcost[i].addEventListener("keyup",()=>{
        let price = +(allcost[0].value);
        let tax = +(allcost[1].value);
        let  taxvlu = +((tax/100) * price) ;
        let discount= +(allcost[2].value)
        let  discountvlu = (discount/100) * (taxvlu +price );
        allcost[4].value = ((taxvlu +price ) -  discountvlu) ;
    });
};
let createproduct =()=>{
    let newproduct ={
        title : title.value ,
        price : allcost[0].value ,
        tax : allcost[1].value ,
        discount : allcost[2].value ,
        quantity : allcost[3].value ,
        netprice : allcost[4].value ,
        department : depart.value
    }
    if( validationState1 == true && validationState2 == true ){
        if(mood == "creat"){
            products.push(newproduct);
        }
        else{
            products[indexid] = newproduct ;
            mood = "creat"
            cbtn[0].innerHTML = "Add Product" ;
            cbtn[0].classList.replace("btn-updat","btn") ;
            count.classList.remove("hide");    
        }   
        clearinput();
        renderData();
        localStorage.setItem("products",JSON.stringify(products)); 
        validationState1= false;
        validationState2= false;
    }
    
}

let clearinput = () => {
    title.value ="";
    allcost[0].value ="";
    allcost[1].value ="";
    allcost[2].value ="";
    allcost[3].value ="";
    allcost[4].value ="";
    depart.value="";
}

let renderData = ()=>{
    let table= "" ;
    for(let i=0; i < products.length ; i++){
        table += `
        <tr>
        <td>${i + 1}</td>
       <td>${products[i].title}</td>
       <td>${products[i].price} Le.</td>
       <td>${products[i].tax} %</td>
       <td>${products[i].discount} %</td>
       <td>${products[i].netprice} Le.</td>
       <td>${products[i].quantity}</td>
       <td>${(products[i].quantity) * (products[i].netprice)} Le </td>
       <td>${products[i].department}</td>
       <td > <a onclick = 'updatetitem(${i})' > <i class="fa-solid fa-pen-to-square"></i> </a>
       <a onclick = 'deletitem(${i})'  > <i class="fa-solid fa-trash"></i> </a> </td>
       </tr>
    `
    }

    tbody.innerHTML = table;
    };
    renderData();
    let deletitem =(i)=>{
    products.splice(i,1);
    localStorage.setItem("products",JSON.stringify(products)); 
    renderData();
    }
    
    let updatetitem = (i)=>{
        mood = "update";
        indexid = i;
        title.value =products[i].title;
        allcost[0].value =products[i].price;
        allcost[1].value =products[i].tax;
        allcost[2].value =products[i].discount;
        allcost[3].value =products[i].quantity;
        allcost[4].value =products[i].netprice;
        depart.value=products[i].department;
        cbtn[0].innerHTML = `Update Data : ${i+1}`;
        cbtn[0].classList.replace("btn","btn-updat");
    }



    cbtn[0].addEventListener('click', createproduct);



    let cleardata =()=>{
        localStorage.clear();
        products.splice(0);
        renderData();
    }
    
    cbtn[1].addEventListener('click', cleardata);
