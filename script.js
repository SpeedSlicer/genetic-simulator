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

function beanCreation(motherGamete, fatherGamete) {
  // Fix typo in parameter names
  let hands = motherGamete[0] + fatherGamete[0]; 
  let legs = motherGamete[1] + fatherGamete[1];
  let color = motherGamete[2] + fatherGamete[2];
  let motherGenderChromosome = motherGamete[3].toUpperCase();
  let fatherGenderChromosome = fatherGamete[3].toUpperCase();
  let motherMutationChromosome = motherGamete[3];
  let fatherMutationChromosome = fatherGamete[3];
  let genderChrome = motherMutationChromosome + fatherMutationChromosome;
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
  
  // Dominant-Recessive for Hands
  // Large Hands is recessive (h), Small Hands is dominant (H)
  let handSize = hands.includes("H") ? "small-hands" : "large-hands";
  leftHand.className = `hands ${handSize} left-hand`;
  rightHand.className = `hands ${handSize} right-hand`;

  // Incomplete Dominance for Legs
  // Large Legs is recessive (l), Medium Legs is heterozygous (Ll), Small Legs is dominant (L)
  // Note: "Ll" and "lL" are treated as heterozygous for medium legs
  let legSize =
    legs === "ll"
      ? "large-legs"
      : legs === "Ll" || legs === "lL"
      ? "medium-legs"
      : "small-legs";
  leftLeg.className = `legs ${legSize} left-leg`;
  rightLeg.className = `legs ${legSize} right-leg`;

  // Co-Dominance for Color
  // Both of the traits show up if both are present
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
  // Determined by the father's chromosome (Y or X)
  let head = document.getElementById("head");
  if (head) {
    if (motherGenderChromosome == "X" && fatherGenderChromosome == "Y") {
      head.style.backgroundColor = "yellow";
    } else {
      head.style.backgroundColor = "black";
    }
  }
  
  // X-Linked Mutation
  // If both end genes have the mutation, they get it
  let xLinkedMutation = false; 
  if (head && motherMutationChromosome != "X" && fatherMutationChromosome != "X") {
    head.style.backgroundColor = "green";
    xLinkedMutation = true;
  }
  
  bean.style.transition = "background-color 0.2s, background-image 0.2s";
  leftHand.style.transition = "all 0.2s";
  rightHand.style.transition = "all 0.2s";
  leftLeg.style.transition = "all 0.2s";
  rightLeg.style.transition = "all 0.2s";
  if (head) {
    head.style.transition = "background-color 0.2s";
  }
  
  console.log(`Hands: ${hands}, Legs: ${legs}, Color: ${color}, X-Linked Mutation: ${xLinkedMutation}, Gender: ${genderChrome}`);
  debugText.innerHTML = `Hands: ${hands}, Legs: ${legs}, Color: ${color}, <br>X-Linked Mutation: ${xLinkedMutation}, Gender: ${genderChrome}`;
}

function newGeneration() {
  let pedigreeTree = document.getElementById("pedigreeTree");
  let currentGen = document.getElementById("generation" + generation);
  let currentParentMale = false;
  let newGen = document.createElement("div");
  newGen.id = "generation" + (generation + 1);
  newGen.className = "generationContainer";

  if (currentGamete2.charAt(3).toUpperCase() == "Y") {
    currentParentMale = true;
  }

  createRandomBean(!currentParentMale);

  let motherFGamete, fatherFGamete;
  
  if (currentParentMale == false) {
    motherFGamete = Math.random() > 0.5 ? currentGamete1 : currentGamete2;
    fatherFGamete = Math.random() > 0.5 ? randomBeanGamete1 : randomBeanGamete2;
  } else {
    motherFGamete = Math.random() > 0.5 ? randomBeanGamete1 : randomBeanGamete2;
    fatherFGamete = Math.random() > 0.5 ? currentGamete1 : currentGamete2;
  }

  const otherParentGamete1 = randomBeanGamete1;
  const otherParentGamete2 = randomBeanGamete2;
  
  let otherParentButton = document.createElement("button");
  otherParentButton.innerHTML = `${otherParentGamete1}, ${otherParentGamete2}`;
  otherParentButton.onclick = function () {
    beanCreation(otherParentGamete1, otherParentGamete2);
  };
  currentGen.appendChild(otherParentButton);

  const storedMotherGamete = motherFGamete;
  const storedFatherGamete = fatherFGamete;
  
  let newButton = document.createElement("button");
  newButton.innerHTML = `${storedMotherGamete}, ${storedFatherGamete}`;
  newButton.onclick = function () {
    beanCreation(storedMotherGamete, storedFatherGamete);
  };

  currentGamete1 = motherFGamete;
  currentGamete2 = fatherFGamete;

  newGen.appendChild(newButton);
  pedigreeTree.appendChild(newGen);

  generation++;
}

function newCustomGeneration() {
  let pedigreeTree = document.getElementById("pedigreeTree");
  let currentGen = document.getElementById("generation" + generation);
  let currentParentMale = false;
  let newGen = document.createElement("div");
  newGen.id = "generation" + (generation + 1);
  newGen.className = "generationContainer";

  if (currentGamete2.charAt(3).toUpperCase() == "Y") {
    currentParentMale = true;
  }

  let motherFGamete, fatherFGamete;

  const randomBeanGamete1 = window.prompt("Enter the Mother Gamete", "hLCX");
  const randomBeanGamete2 = window.prompt("Enter the Father Gamete", "hLCY");

  
  if (currentParentMale == false) {
    motherFGamete = Math.random() > 0.5 ? currentGamete1 : currentGamete2;
    fatherFGamete = Math.random() > 0.5 ? randomBeanGamete1 : randomBeanGamete2;
  } else {
    motherFGamete = Math.random() > 0.5 ? randomBeanGamete1 : randomBeanGamete2;
    fatherFGamete = Math.random() > 0.5 ? currentGamete1 : currentGamete2;
  }

  const otherParentGamete1 = randomBeanGamete1;
  const otherParentGamete2 = randomBeanGamete2;
  
  let otherParentButton = document.createElement("button");
  otherParentButton.innerHTML = `${otherParentGamete1}, ${otherParentGamete2}`;
  otherParentButton.onclick = function () {
    beanCreation(otherParentGamete1, otherParentGamete2);
  };
  currentGen.appendChild(otherParentButton);

  const storedMotherGamete = motherFGamete;
  const storedFatherGamete = fatherFGamete;
  
  let newButton = document.createElement("button");
  newButton.innerHTML = `${storedMotherGamete}, ${storedFatherGamete}`;
  newButton.onclick = function () {
    beanCreation(storedMotherGamete, storedFatherGamete);
  };

  currentGamete1 = motherFGamete;
  currentGamete2 = fatherFGamete;

  newGen.appendChild(newButton);
  pedigreeTree.appendChild(newGen);

  generation++;
}
beanCreation("hLCX", "hLCY");