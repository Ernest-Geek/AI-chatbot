import dotenv from 'dotenv';
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dialogflow from 'dialogflow';
import { db } from './config/database.js'
import { authRouter } from './routes/authroutes.js'
import bodyParser from 'body-parser'

dotenv.config()

//creating an express app
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: 'http://127.0.0.1:43693',
        credentials: true
    }
});

httpServer.listen(3000);

//Configures the express app to parse incoming json data
app.use(express.json())
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: false }))

db.authenticate()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Unable to connect to database", err))

const sessionId = '1234';
const projectId = process.env.PROJECT_ID
    
const credentials = {
   client_email: process.env.CLIENT_EMAIL,
   private_key: process.env.GOOGLE_PRIVATE_KEY
}

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

async function query(request) {
    const responses = await sessionClient.detectIntent(request)
    return responses
}

io.on('connection', function(socket) {
    socket.on('chat message', (transcript) => {
        console.log(`Received text: ${transcript}`)
     
        const request = {
            session: sessionPath,
            queryInput: {
            text: {
                text: transcript,
                languageCode: 'en-US',
            },
            },
        };
        
        query(request).then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
            } else {
                console.log(`  No intent matched.`);
            }
        })
    });
});

app.get("/", function(req, res){
    res.sendFile(process.cwd() + "/templates/base.html")
})

app.use("/api/auth", authRouter)

app.listen(5000, () => {
    console.log(`Server is running on ${5000}`)
})
