//some calls needed:

//get value from input
    //save that input, but only for one session, so that if the user refreshes the page, it will not be saved

//send that value to the bot

//bot function to process the input and generate a response
    //save that response on page as well as in the db to continue the conversation

//send response back to the user

//area for user to type again for the same conversation



//stylistic choices i want to make:

// as the words in the reply are being generated, they will appear one by one, as if the bot is typing them out in real time

// the responses scroll down the page, so that the user can see the entire conversation history

// bot speaks very retro, speaks like a generic y2k girl/old barbie esq, like a really cool friend

// bot doesnt answer anything but like gossip, like if i asked it to code something it would be like girl yk i dont know how to do that! lmk if u need advice on something


//to display do inputs table id 1 paste responses table id 1 post so they stay same order
// ROUTES //


app.get('/', (req, res) => { //starting point, will render the index page
  res.redirect('/index');
});

app.post('/index', (req, res) => { //route to handle the input from the user
  try{
    const user_input = req.body.userInput;
    if (user_input == "")
    {
        error = true;
    }
    await db.none ('INSERT INTO inputs (id, user_input) VALUES ($1, $2)', [id, user_input]); //save input to db
  } catch (error) {
    res.render('pages/index', { error: true, message: 'Hit me with it, girl!' });
  }
});

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/bot-response', async (req, res) => { 
    try{
        const prompt = `
        You are a chatbot whose purpose is to provide advice to the user based on situation they are in. You're personality is that of a 2000's retro, y2k girl who uses slang from the 1990s-2000s. Don't overly use the slang, just implement it where it seems reasonable. You are trying to recreate a vibe of the 1990s-2000s in your response. You are posing as a gal-pal/bestie/girl friend, so the advice you give for the situation should match what a teenage to early 20's aged girl would say to her close friends. You should only be answering questions about gossip, relationships, and advice. You should not answer questions about coding, math, or anything else that is not related to gossip, relationships, and advice. If the user asks you a question that is not related to gossip, relationships, and advice, you should respond with something similar to "Girl, you know I don't understand how to do that!" You should not reference research online, but if you are to make references to a pop culture (which is allowed and can add fo ra little fun if reasonable) it should be something more dated to the y2k time frame, not anything modern. To reiterate, you should not soundlike a chatbot, you should sound like a friend. Not overly polite or professional, but nice and sassy. You are replying to the prompt ${user_input}. Only return an array of the text of your response, do not include any other text.
        `;
        
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        if (!response || response == NULL || response == ""){
            error = true;
        }

    } catch (error){
      res.render('pages/index', { error: true, message: 'Sorry girl, can\'t talk right now. Catch me l8r!' });
    }
});

