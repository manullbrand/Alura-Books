// fetch() é um método assíncrono do JS, me retornando uma Promise:
// var consultaCEP = fetch("https://viacep.com.br/ws/01001000/json/")
//   .then((resposta) => resposta.json())
//   .then((r) => {
//     if (r.erro) {
//       throw Error("Esse CEP não existe");
//     } else console.log(r);
//   })
//   // Se eu tirar um numero ali em cima do CEP, vai cair nesse erro aqui debaixo (faça o teste mudando o 0 final por 2, p. ex.). Porém para eu ter uma mensagem personalizada de erro, preciso usar o throw que usei ali em cima:
//   .catch((erro) => console.log(erro))
//   .finally((mensagem) => console.log("Processamento concluído!"));

// console.log(consultaCEP);

// Agora construindo um código despoluído, sem aquele monte de "then":
async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";

  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error("CEP não existente!");
    }
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido.</p>`;
    console.log(erro);
  }
}

// let ceps = ["01001000", "01001001"];
// let conjuntoCeps = ceps.map((valores) => buscaEndereco(valores));
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas))

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
