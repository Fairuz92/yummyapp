$(window).ready(function(){
   $(".loading-screen").fadeOut(300);

})
/////////////////  side navbar 
function openNav() {
   $(".sideNav").animate({ left: 0 }, 500)
   $(".toggleIcon").removeClass("fa-align-justify")
   $(".toggleIcon").addClass("fa-x")
   for (let i = 0; i < 5; i++) {
      $(".navItem li").eq(i).animate({ top: 0 }, (i + 1) * 200)
   }
}
function closeNav() {
   let navWidth = $(".sideNav .innerNav").outerWidth();
   $(".sideNav").animate({ left: -navWidth }, 500)
   $(".toggleIcon").addClass("fa-align-justify")
   $(".toggleIcon").removeClass("fa-x")
   for (let i = 0; i < 6; i++) {
      $(".navItem li").eq(i).animate({ top: 200 }, (i + 1) * 100)
   }
}
$(".toggleIcon").click(function () {
   if ($(".sideNav").css("left") == "0px") {
      closeNav();
   }
   else {
      openNav();
   }
})
closeNav();
///////////////////////
let searching =document.getElementById("searching");
let rowData = document.getElementById("ROW");
searchName("");
/////////////////////
///////////////// searching
$("#Search").click(function(){
   closeNav();
   //console.log("hi search");
   rowData.innerHTML="";
   searching.innerHTML=`
   <div class="row">
        <div class="col-md-6 ">
          <input onkeyup="searchName(this.value)" type="text" class="form-control bg-dark-50 " placeholder="Search By Name" />
        </div>
        <div class="col-md-6 ">
          <input onkeyup="searchFL(this.value)" type="text" class="form-control bg-dark-50 " placeholder="Search By First Letter" />
        </div>
      </div>`
})

async function searchName(value){
console.log(value);
closeNav();
rowData.innerHTML = "";
$("loading-screen").fadeIn(500)

let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
result = await result.json()
displayMeals(result.meals)
}
async function searchFL(value) {
   closeNav();
   rowData.innerHTML = "";
   $("loading-screen").fadeIn(500)
   value == "" ? value = "a" : "";
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
   result = await result.json()
   displayMeals(result.meals)
}
///////////////////////////////////////////////
/////////categories
$("#Categories").click(function () {
   getCategories();
   closeNav();
})
async function getCategories() {
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(500);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   result = await result.json();
   displayCat(result.categories);
}
function displayCat(cate) {
   let cartoona = "";
   for (let i = 0; i < cate.length; i++) {
      cartoona += `
<div class="col-md-3">
<div onclick="getCateMeals('${cate[i].strCategory}')" class="item position-relative overflow-hidden">
  <img src="${cate[i].strCategoryThumb}" class="w-100" />
  <div class="itemLayer position-absolute text-center text-black overflow-hidden">
  <h3>${cate[i].strCategory}</h3>
  <p>${cate[i].strCategoryDescription}</p>
</div>
</div>

</div>`}
   rowData.innerHTML = cartoona;
}
async function getCateMeals(strCategory){
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(600);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
   res = await result.json()
   displayMeals(res.meals.slice(0, 20))
}
//////////////////////////////
////////// Area
$("#Area").click(function () {
   getArea();
   closeNav();
})
async function getArea() {
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(600);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   result = await result.json();
   displayArea(result.meals);
}
function displayArea(area) {
   console.log(area.length);
   let cartoona = "";
   for (let i = 0; i < area.length; i++) {
      cartoona += `
      <div class="col-md-3">
      <div onclick="getAreaMeals('${area[i].strArea}')" class="item">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${area[i].strArea}</h3>
      </div>
      </div>`
   }
   searching.innerHTML="";
   rowData.innerHTML = cartoona;
}
async function getAreaMeals(strArea) {
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(600);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
   result = await result.json()
   displayMeals(result.meals.slice(0, 20))
   $("loading-screen").fadeOut(600)

}
///////////////////////////////////////////
//////////////////  Ingredients
$("#Ingredients").click(function () {
   getIngredients();
   closeNav();
})
async function getIngredients() {
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(600);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   result = await result.json()
   let res = result.meals.slice(0, 20)
   displayIngredients(res);
}
function displayIngredients(ingred) {
   let cartoona = "";
   for (let i = 0; i < ingred.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getIngredMeals('${ingred[i].strIngredient}')" class="item">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${ingred[i].strIngredient}</h3>
                      <p>${ingred[i].strDescription.slice(0, 100)}</p>
              </div>
      </div>  `
   }
   searching.innerHTML="";
   rowData.innerHTML = cartoona;
   console.log(rowData.innerHTML);
}
async function getIngredMeals(strIngredient) {
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(600);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
   result = await result.json()
   displayMeals(result.meals.slice(0, 20))
}
/////////////////////////////
///////////// meal display&get deatails&display details//////

function displayMeals(meal) {
   rowData.innerHTML = "" ;
   //searching.innerHTML="";
   $(".loading-screen").fadeOut(600);
   let cartoona = "";
   for (let i = 0; i < meal.length; i++) {
       cartoona += `
       <div class="col-md-3">
               <div onclick="getDetail('${meal[i].idMeal}')" class="item position-relative overflow-hidden ">
                   <img class="w-100" src="${meal[i].strMealThumb}" />
                   <div class="itemLayer position-absolute d-flex justify-content-center align-items-center text-black p-2 overflow-hidden">
                       <h3>${meal[i].strMeal}</h3>
                   </div>
               </div>
       </div> `
   }
   rowData.innerHTML = cartoona
}
async function getDetail(id) {
   closeNav()
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(500);
   let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   result = await result.json();
   displayDetail(result.meals[0])
}
function displayDetail(meal) { 
   rowData.innerHTML = "" ;
   searching.innerHTML="";
   $(".loading-screen").fadeOut(500);
   let RecipesList = ``
   for (let i = 1; i <= 20; i++) {
       if (meal[`strIngredient${i}`]) {
           RecipesList += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
       }}
 let tag = meal.strTags?.split(",")
   if (!tag)
   { tag = []}
   let tagStr = ''
   for (let i = 0; i < tag.length; i++) {
       tagStr += `
       <li class="alert alert-danger m-2 p-1">${tag[i]}</li>`
   }
   let cartoona = `
   <div class="col-md-4">
               <img class="w-100 rounded-2" src="${meal.strMealThumb}"/>
                   <h2>${meal.strMeal}</h2>
   </div>
           <div class="col-md-8">
               <h2>Instructions</h2>
               <p>${meal.strInstructions}</p>
               <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
               <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
               <h3>Recipes :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${RecipesList}
               </ul>

               <h3>Tags :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${tagStr}
               </ul>
               <a  href="${meal.strSource}" class="btn btn-success">Source</a>
               <a  href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
           </div>`

   rowData.innerHTML = cartoona
}
/////////////////////////////////////////////////////////
/////////////// contact
$("#Contact").click(function(){
   closeNav();
   rowData.innerHTML = "" ;
   $(".loading-screen").fadeOut(500);
   rowData.innerHTML = `<div class="contact vh-100 d-flex justify-content-center align-items-center">
   <div class="container w-75 text-center">
       <div class="row g-4">
           <div class="col-md-6">
               <input id="name" type="text" class="form-control" placeholder="Enter Your Name">
           </div>
           <div class="col-md-6">
               <input id="email" type="email" class="form-control " placeholder="Enter Your Email">
           </div>
           <div class="col-md-6">
               <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
           </div>
           <div class="col-md-6">
               <input id="age" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
               
           </div>
           <div class="col-md-6">
               <input  id="password" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
               
           </div>
           <div class="col-md-6">
               <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
               
           </div>
       </div>
       <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
   </div>
</div> `
})