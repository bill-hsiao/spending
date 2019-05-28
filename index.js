require('dotenv').config()

const app = require('./main')

const port = process.env.PORT || 80

app.listen(port, () => console.log(`API server started on ${port}`))
