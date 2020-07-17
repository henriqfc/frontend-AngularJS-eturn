angular.module('eTurnApp')
    .controller('HomeCtrl', [
        '$scope', 'GetData', 'GetNotasApi', '$location',
        function ($scope, GetData, GetNotasApi, $location) {
            console.log('Loaded.');
            $scope.categorias = [];
            $scope.filter = {};
            $scope.filterCategorias = [];
            GetData.get('/data/produtos.js').then(retorno => {
                $scope.produtos = retorno;
                $scope.TratarProdutos();
            });
            $scope.TratarProdutos = () => {
                $scope.produtos.map((item, i) => {
                    item['imagemDestacada'] = item.imagens.filter(img => img.destacada)[0].nome;
                    return item;
                });
                $scope.GetNotas();
                // console.log('Produto com imagem Destacada: ' + $scope.produtos);
                let categorias = $scope.produtos.map((item, i) => {
                    return {
                        id: i + 1,
                        Nome: item['categoria']
                    }
                });
                $scope.categorias = Array.from(new Set(categorias));
                $scope.limparFiltro();
            }
            $scope.GetNotas = () => {
                $scope.produtos.forEach(item => {
                    if (item.notas.length > 0) {
                        // http://api.mathjs.org/v4?expr=sum(2,1,2) / 3
                        let expr = 'sum(';
                        let notas = '';
                        item.notas.forEach(n => {
                            notas += n.nota + ',';
                        });
                        notas = notas.slice(0, -1);
                        expr += notas + ')/' + item.notas.length;
                        GetNotasApi.get(expr).then(retorno => {
                            item.NotaApi = retorno;
                        });
                    } else {
                        item.NotaApi = 0;
                    }
                });
            }
            $scope.limparFiltro = () => {
                $scope.filter = {
                    Disponivel: true,
                    Precos: [],
                    PrecosLista: [
                        {
                            id: 0,
                            Nome: ''
                        },
                        {
                            id: 1,
                            Nome: 1
                        },
                        {
                            id: 2,
                            Nome: 2
                        },
                        {
                            id: 3,
                            Nome: 3
                        },
                        {
                            id: 4,
                            Nome: 4
                        },
                    ],
                    Categorias: [],
                    CategoriasLista: [],
                };
                $scope.filter.CategoriasLista = $scope.categorias;
                $scope.filter.CategoriasLista.splice(0, 0, {
                    id: 0, Nome: ''
                });
                $scope.selected();
            }






            $scope.ProdutosFiltrados = [];

            $scope.selected = () => {
                $scope.ProdutosFiltrados = $scope.produtos.filter((item) => {
                    return item.disponivel === $scope.filter.Disponivel &&
                        ($scope.filter.Precos.Nome ? $scope.filter.Precos.Nome.toString() === item.precoMedio.toString() : true) &&
                        ($scope.filter.Categorias.Nome ? $scope.filter.Categorias.Nome === item.categoria : true)
                });
                // console.log($scope.ProdutosFiltrados);
            }

            $scope.getStars = function (rating) {
                // Get the value

                var val = parseFloat(rating);
                // Turn value into number/100
                var size = val / 5 * 100;
                return size + '%';
            }
            $scope.getDolars = function (rating) {
                // Get the value

                var val = parseFloat(rating);
                // Turn value into number/100
                var size = val / 5 * 100;
                return size + '%';
            }
            $scope.clickDetalhes = (id) => {
                $location.path('/product/' + id);
            }

        }
    ]);