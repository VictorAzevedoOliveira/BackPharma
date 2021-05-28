const express = require('express');
const app = express();
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const path = require('path');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(__dirname));

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, '../frontend/app_front/lib/main.dart'));
//  });


const rotaProdutos = require('./routes/produtos');
const rotaUsuarios = require('./routes/userRouter');
const rotaDesejos = require('./routes/listadesejos');
const rotaCupons = require('./routes/cupons');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Acess-Control-Allow-Origin','*') //o * aceita todos os servidores
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});


app.use('/produtos',rotaProdutos);
app.use('/listadesejos',rotaDesejos);
app.use('/usuarios',userRouter);
app.use('/cupons',rotaCupons);


app.all('*', (req, res, next) =>
  next(new AppError(`A rota ${req.originalUrl} não existe!`))
);

//Se a rota não for encontrada
app.use((req,res,next) =>{
    const erro = new Error('Não Encontrado');
    erro.status= 404;
    next(erro);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});
app.use(globalErrorHandler);

module.exports = app;