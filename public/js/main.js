// import { generateText } from "../../controllers/openaiController";
// import { post } from "../../routes/openaiRoutes";

//const { generateImage, generateText } = require("../../controllers/openaiController");

function onSubmit(e) {
    e.preventDefault();

    // document.querySelector('msg').textContent = '';
    // document.querySelector('result')= '';

    //const prompt1 = document.querySelector('#prompt1').value;

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if ( prompt === ''){
        alert("Please fill in something")
        return;
    }

    //console.log(prompt);
    //generateText(prompt1);
    generateImage(prompt, size);
}

// async function generateText(prompt){
//     try {

//         showSpinner();
//         const response = await fetch('/openai/generateText',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 prompt
//             })
//         });
//         if (!response.ok){
//             throw new Error('text cannot generated')
//         }

//         const resp = await response.json();
//         console.log(resp.data.choices[0].text);
//         const textContent = resp.data.choices[0].text;
//         //document.querySelector('.result') = textContent;
//         document.getElementById('result').innerHTML = textContent;

//     } catch (error) {
//         document.querySelector('.msg').textContent = error;
//     }
// }
async function generateImage(prompt,size) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);

//document.querySelector('#form').addEventListener('submit',onSubmit);