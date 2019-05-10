require('dotenv').config()

const app = require('./application')

const port = 5000

app.listen(port, () => console.log(`API server started on ${port}`))
