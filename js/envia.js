export function modificaebaixa(arquivo){
  const json = JSON.stringify(arquivo);
  const download = document.createElement('a');
  download.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
  download.download = 'dado.json';
  download.click();
  console.log(download.href)
}


export function enviajson(){
    const dados = {
      nome: "João",
      idade: 30,
      cidade: "São Paulo"
    };
    
    fetch('https://api.jsonbin.io/v3/b/64c086fd8e4aa6225ec3966f', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
      .then(response => response.json())
      .then(data => {
        // Lida com a resposta do servidor (se houver)
        console.log(data);
        modifyJson('https://api.jsonbin.io/v3/b/64c086fd8e4aa6225ec3966f')
      })
      .catch(error => {
        // Lida com erros de requisição
        console.error('Erro: deu merda');
      });
  }