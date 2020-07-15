# frontend-AngularJS-eturn


Desafio
Sua missão é criar uma página com função de listar, detalhar e calcular nota média de looks usando uma API externa em uma loja virtual.

Requisitos
Usuário terá a capacidade de filtrar por disponível/indisponível, faixa de preço e categoria
O usuário deve ter capacidade de diferenciar na lista o produto disponível/indisponível com facilidade
Preço médio estará sempre entre 1 e 4
Nota média deve ser calculada utilizando a API math.js. A nota mínima é 1 e máxima é 5
Para usar a API deve ser feito um GET para a API http://api.mathjs.org/v4 e deve ser enviado como parâmetro a seguinte estrutura: { expr=sum(2,1,2) / 3} onde 2,1,2 são as notas recebidas para o look e 3 é a quantidade de notas recebidas. Para este exemplo o total é de: 1.6666666666666667. O valor deve ser arredondado para uma casa decimal, no exemplo ficaria 1.7 e então marcar a nota média do look.
Estrutura da página
Filtro (Consultas client side)
Disponível
Preço
Categorias
Sessão resultados
Look item
Imagem (Exibir a imagem com flag destacada = true)
Nome do look
Categoria
Nota média (calcular via api)
Preço médio
Disponibilidade
Saiba mais (Abrir sessão detalhes)
Sessão Detalhes
Imagens (Exibir lista de imagens navegável)
Nome do look
Nota média (Obter o valor já calculado ou calcular novamente, fica a critério)
Texto
Regras
É permitido realizar pesquisas na internet
É permitido o uso de framework CSS (da sua escolha)
Na parte de JS deve ser utilizado AngularJS
Os dados para serem exibidos devem ser lidos do arquivo produtos.js localizado dentro da pasta data
As imagens existentes no arquivo produtos.js estão na pasta arquivos/produtos
