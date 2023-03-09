const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateText = async (req, res)=>{

    const {prompt} = req.body;
    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
    const text = response.data

    res.status(200).json({
        success:true,
        data: text
    });
    }catch (error){
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
        res.status(400).json({
        success: false,
        error:'The Job Desctription examples cannot be generated'
        });
    }
};

const generateImage = async (req, res) =>{

    const { prompt, size} = req.body

    const imageSize = size === 'small' ? '256x256' : size === 'medium'?
    '512x512': '1024x1024'

    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: imageSize
        });

        const imageUrl = response.data.data[0].url

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
        res.status(400).json({
        success: false,
        error:'The image cannot be generated'
        });
    
    }
}

module.exports = {generateText, generateImage}