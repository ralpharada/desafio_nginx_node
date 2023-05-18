const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people (name) values ('Ralph')`
connection.query(sql)
app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    let sql = `select * from people`
    connection.query(sql, (error, result) => {
        if (error) {
            return;
        }
        // Cria a tabela HTML com os nomes
        let tableHTML = '<h1>Full Cycle Rocks!</h1><br/><table><tr><th>Nome</th></tr>';
        result.forEach((row) => {
            tableHTML += `<tr><td>${row.name}</td></tr>`;
        });
        tableHTML += '</table>';
        res.send(tableHTML)
    })
    connection.end()
})
app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})