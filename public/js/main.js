// import { generateText } from "../../controllers/openaiController";
// import { post } from "../../routes/openaiRoutes";

function onSubmit(e) {
    e.preventDefault();

    // document.querySelector('msg').textContent = '';
    // document.querySelector('result')= '';

    const prompt = document.querySelector('#prompt').value;

    if (prompt === ''){
        alert("Please fill in something")
        return;
    }

    //console.log(prompt);
    generateTextRequest(prompt);
}

async function generateTextRequest(prompt){
    try {
        const response = await fetch('/openai/generateText',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt
            })
        });
        if (!response.ok){
            throw new Error('text cannot generated')
        }

        const resp = await response.json();
        console.log(resp.data.choices[0].text);
        const textContent = resp.data.choices[0].text;
        //document.querySelector('.result') = textContent;
        document.getElementById('result').innerHTML = textContent;

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

document.querySelector('#form').addEventListener('submit',onSubmit);