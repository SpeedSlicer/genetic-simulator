let generation = 1;
let randomBeanGamete1 = "";
let randomBeanGamete2 = "";
let currentGamete1 = "hLCX";
let currentGamete2 = "hLCY";

function createRandomBean(isMale) {
  const hands = Math.random() > 0.5 ? "H" : "h";
  const legs = Math.random() > 0.5 ? "L" : "l";
  const color = Math.random() > 0.5 ? "C" : "c";
  const gender = Math.random() > 0.5 ? "X" : "x";
  randomBeanGamete1 = hands + legs + color + gender;

  const hands2 = Math.random() > 0.5 ? "H" : "h";
  const legs2 = Math.random() > 0.5 ? "L" : "l";
  const color2 = Math.random() > 0.5 ? "C" : "c";
  const gender2 = isMale ? "Y" : Math.random() > 0.5 ? "X" : "x";
  randomBeanGamete2 = hands2 + legs2 + color2 + gender2;
}
function beanCreation(motherGamede, fatherGamede) {
  let hands = motherGamede[0] + fatherGamede[0];
  let legs = motherGamede[1] + fatherGamede[1];
  let color = motherGamede[2] + fatherGamede[2];
  let motherGenderChromosome = motherGamede[3].toUpperCase();
  let fatherGenderChromosome = fatherGamede[3].toUpperCase();
  let motherMutationChromosome = motherGamede[3];
  let fatherMutationChromosome = fatherGamede[3];

  let genderChrome = motherMutationChromosome + fatherMutationChromosome;
  let xLinkedMutation = false;
  if (genderChrome.includes("x") && !genderChrome.includes("X")) {
    xLinkedMutation = true;
  }
  let bean = document.getElementById("bean");
  let leftHand = document.getElementById("left-hand");
  let rightHand = document.getElementById("right-hand");
  let leftLeg = document.getElementById("left-leg");
  let rightLeg = document.getElementById("right-leg");
  let debugText = document.getElementById("debugText");

  if (!bean || !leftHand || !rightHand || !leftLeg || !rightLeg || !debugText) {
    console.error("One or more required DOM elements are missing.");
    return;
  }

  debugText.innerHTML = `Hands: ${hands}, Legs: ${legs}, Color: ${color}, <br>X-Linked Mutation: ${xLinkedMutation}, Gender: ${genderChrome}`;

  // Dominant-Recessive for Hands
  let handSize = hands.includes("H") ? "small-hands" : "large-hands";
  leftHand.className = `hands ${handSize} left-hand`;
  rightHand.className = `hands ${handSize} right-hand`;

  // Incomplete Dominance for Legs
  let legSize =
    legs === "LL"
      ? "large-legs"
      : legs === "Ll" || legs === "lL"
      ? "medium-legs"
      : "small-legs";
  leftLeg.className = `legs ${legSize} left-leg`;
  rightLeg.className = `legs ${legSize} right-leg`;

  // Co-Dominance for Color
  if (color === "CC") {
    bean.style.backgroundImage = "";
    bean.style.backgroundColor = "red";
  } else if (color === "Cc" || color === "cC") {
    bean.style.backgroundImage = "radial-gradient(circle, white 20%, red 70%)";
    bean.style.backgroundColor = "";
  } else if (color === "cc") {
    bean.style.backgroundImage = "";
    bean.style.backgroundColor = "white";
  }

  // Gender
  let head = document.getElementById("head");
  if (head) {
    if (motherGenderChromosome === "X" && fatherGenderChromosome === "Y") {
      head.style.backgroundColor = "yellow";
    } else {
      head.style.backgroundColor = "black";
    }
  }

  bean.style.transition = "background-color 0.2s, background-image 0.2s";
  leftHand.style.transition = "all 0.2s";
  rightHand.style.transition = "all 0.2s";
  leftLeg.style.transition = "all 0.2s";
  rightLeg.style.transition = "all 0.2s";
  if (head) {
    head.style.transition = "background-color 0.2s";
  }
}

function newGeneration() {
  let pedigreeTree = document.getElementById("pedigreeTree");
  let currentGen = document.getElementById("generation" + generation);
  let currentParentMale = false;
  let newGen = document.createElement("div");
  newGen.id = "generation" + (generation + 1);
  newGen.className = "generationContainer";
  if(currentGamete2.charAt(3).toUpperCase() == "Y"){
    currentParentMale = true;
  }
  createRandomBean(!currentParentMale);
  if(currentParentMale == false){
    motherGamede = Math.random() > 0.5 ? currentGamete1 : currentGamete2;
    fatherGamede = Math.random() > 0.5 ? randomBeanGamete1 : randomBeanGamete2;
  }
  else if(currentParentMale == true){
    motherGamede = Math.random() > 0.5 ? randomBeanGamete1 : randomBeanGamete2;
    fatherGamede = Math.random() > 0.5 ? currentGamete1 : currentGamete2;
  }
  let otherParentButton = document.createElement("button");
  otherParentButton.innerHTML = `${randomBeanGamete1}, ${randomBeanGamete2}`;
  otherParentButton.onclick = function () {
    beanCreation(randomBeanGamete1, randomBeanGamete2);
  };
  currentGen.appendChild(otherParentButton);
  let newButton = document.createElement("button");
  newButton.innerHTML = `${motherGamede}, ${fatherGamede}`;
  newButton.onclick = function () {
    beanCreation(motherGamede, fatherGamede);
  };
  currentGamete1 = motherGamede;
  currentGamete2 = fatherGamede;
  newGen.appendChild(newButton);

  pedigreeTree.appendChild(newGen);

  generation++;
}

beanCreation("hLCX", "hLCY");