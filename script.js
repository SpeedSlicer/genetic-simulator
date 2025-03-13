let generation = 1;
let randomBeanGamete1 = "";
let randomBeanGamete2 = "";

function createRandomBean(){
    const hands = Math.random() > 0.5 ? "H" : "h";
    const legs = Math.random() > 0.5 ? "L" : "l";
    const color = Math.random() > 0.5 ? "C" : "c";
    const gender = Math.random() > 0.5 ? "X" : "x";
    randomBeanGamete1 = hands + legs + color + gender;
    const hands2 = Math.random() > 0.5 ? "H" : "h";
    const legs2 = Math.random() > 0.5 ? "L" : "l";
    const color2 = Math.random() > 0.5 ? "C" : "c";
    const gender2 = Math.random() > 0.5 ? "X" : "Y";
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
  if (motherGenderChromosome === "X" && fatherGenderChromosome === "X") {
    let head = document.getElementById("head");
    head.style.backgroundColor = "black";
  } else if (motherGenderChromosome === "X" && fatherGenderChromosome === "Y") {
    let head = document.getElementById("head");
    head.style.backgroundColor = "yellow";
  }
}

function newGeneration() {
  let currentGen = document.getElementById("generation" + generation);
  let newGen = document.createElement("div");
  newGen.id = "generation" + (generation + 1);
  newGen.className = "generationContainer";
  let motherGamede = prompt("Enter mother gamede:");
  let fatherGamede = prompt("Enter father gamede:");
  let newButton = document.createElement("button");
  newButton.innerHTML = `${motherGamede}, ${fatherGamede}`;
  newButton.onclick = function() {
    beanCreation(motherGamede, fatherGamede);
  };
  newGen.appendChild(newButton);
  document.body.appendChild(newGen);
  generation++;
}

beanCreation("hLCX", "hLCY");