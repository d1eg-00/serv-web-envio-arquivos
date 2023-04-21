const http = require('http');
const porta = 443;
const formidavel = require('formidable');
const fs = require('fs');

const servidor = http.createServer((req, res) => {

  if (req.url != '/enviodearquivo') {

    const file = fs.readFileSync('index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(file);
    return res.end();

  } else {

    const form = new formidavel.IncomingForm()
    form.parse(req, (erro, campos, arquivos) => {
      const urlAntiga = arquivos.filetoupload.filepath
      const urlNova = './enviodearquivo/' + arquivos.filetoupload.originalFilename
      let rawData = fs.readFileSync(urlAntiga)
      fs.writeFile(urlNova, rawData, function(err) {
        if (err) console.log(err)
        res.write('Arquivo enviado com sucesso!')
        res.end()
      })
    })

  }

})

servidor.listen(porta, () => { console.log('Servidor Rodando!') })




