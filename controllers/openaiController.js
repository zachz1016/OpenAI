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

module.exports = {generateText}