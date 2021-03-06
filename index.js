const express = require('express')
const cors = require('cors')
const usuarioRoutes = require('./routes/usuario.routes')
const bibliotecarioRoutes = require('./routes/bibliotecario.routes')
const livroRoutes = require('./routes/livro.routes')
const generoRoutes = require('./routes/genero.routes')
const idiomaRoutes = require('./routes/idioma.routes')
const autorRoutes = require('./routes/autor.routes')
const nacionalidadeRoutes = require('./routes/nacionalidade.routes')
const schedule = require('node-schedule');
const dailyJobs = require('./jobs/dailyJobs')

const app = express()

app.use(express.urlencoded({extended: true }))
app.use(cors())


const rule = new schedule.RecurrenceRule();
rule.hour = 0
rule.tz = 'America/Sao_Paulo'

schedule.scheduleJob(rule, function(){
    console.log('Executing the Schedule!');
    dailyJobs.alterStatusPendente()
    dailyJobs.alterDividaUsuario()
});

app.get('/', (req, res) => {
    res.status(200).json({mensagem: 'Bem vindo a Biblioteca Library!'})
})

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/bibliotecarios', bibliotecarioRoutes)
app.use('/api/livros', livroRoutes)
app.use('/api/generos', generoRoutes)
app.use('/api/idiomas', idiomaRoutes)
app.use('/api/autores', autorRoutes)
app.use('/api/nacionalidades', nacionalidadeRoutes)

app.listen(process.env.PORT, () => {
    console.log('Running at localhost:' + process.env.PORT)
})