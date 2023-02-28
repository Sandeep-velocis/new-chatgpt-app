const client = require('../db/mongodb/database');
const dbName = 'chatgpt';
const { Configuration, OpenAIApi } = require("openai");

//"bot": "\n\nWhich of the following activities do you most enjoy doing while traveling?\n  a. Sightseeing\n  b. Shopping\n  c. Exploring local cuisine\n  d. Trying on different pairs of shoes"


const database = client.db(dbName);

exports.message = async (req, res) => {
    async function run() {
        try {

            const configuration = new Configuration({
                apiKey: "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"

            });
            const openai = new OpenAIApi(configuration);

            if (req.method === "POST") {
                console.log("Form data");
                console.log(req.body)
                console.log("Form data");

                let option = req.body.optionValue

                //db start
                // const database = client.db(dbName);
                // const user = database.collection('user');
                // const payload = {"optionValue": req.body.optionValue}
                // await user.insertOne(payload);
                //db end
                let userOption;
                if (option != "" && option != null) {
                    userOption = option.split(".")

                }
                console.log("userOption");
                console.log(userOption);
                console.log("userOption")

                if (userOption == "" || userOption == undefined && req.body.input1 != "" && req.body.input2 != "" && req.body.input3 != "") {
                    let question = "Create indirect multiple-choice question to understand " + req.body.input1 + "favourite " + req.body.input2 + "activities for " + req.body.input3 + " ?";
                    const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: question,
                        temperature: 0.6,
                        max_tokens: 256,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    });
                    const text = response.data.choices[0].text;
                    console.log("New questions start");
                    console.log(text);
                    console.log("new questions end");
                    res.send(text);

                } else {

                    //logic
                    let forIdentifyKeyword = "The keywords in the phrase" + userOption[1];
                    const responseData1 = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: forIdentifyKeyword,
                        temperature: 0.6,
                        max_tokens: 256,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    });

                    let responseData1Answer = responseData1.data.choices[0].text;

                    console.log("responseData1Answer")
                    console.log(JSON.stringify(responseData1Answer));
                    console.log("responseData1Answer")

                    let arrayRes = responseData1Answer.split("\n")
                    let newOptionVale = arrayRes[2];

                    console.log("phreses value");
                    console.log(newOptionVale);
                    console.log("phreses value");

                    let ByUseIdentifyKeyword = "Create 1 indirect multiple-choice question with context of when, why, what to understand a person's preference for" + newOptionVale;
                    const responseData2 = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: ByUseIdentifyKeyword,
                        temperature: 0.6,
                        max_tokens: 256,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    });
                    let responseData2Answer = responseData2.data.choices[0].text;
                    res.send(responseData2Answer);
                    //logic
                }
            } else {
                res.render('pages/index');
            }

        } finally {
            // Ensures that the client will close when you finish/error
            //   await client.close();
        }
    }
    run().catch(err => console.log(err));

}

//index pages
exports.indexPage = async (req, res) => {

    res.render('pages/index');
}




