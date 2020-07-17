angular.module('eTurnApp')
    .controller('ProductDetailsCtrl', [
        '$scope', '$routeParams', 'GetData', 'GetNotasApi',
        function ($scope, $routeParams, GetData, GetNotasApi) {
            // ler produtos
            $scope.produto = {};
            GetData.get('/data/produtos.js', $routeParams.id).then(retorno => {
                $scope.produto = retorno;
                $scope.init();
            });
            $scope.init = () => {
                $scope.produto.imagemDestacada = $scope.produto.imagens.filter(img => img.destacada)[0].nome;
                $scope.GetNotas();
            }
            $scope.GetNotas = () => {
                if ($scope.produto.notas.length > 0) {
                    // http://api.mathjs.org/v4?expr=sum(2,1,2) / 3
                    let expr = 'sum(';
                    let notas = '';
                    $scope.produto.notas.forEach(n => {
                        notas += n.nota + ',';
                    });
                    notas = notas.slice(0, -1);
                    expr += notas + ')/' + $scope.produto.notas.length;
                    GetNotasApi.get(expr).then(retorno => {
                        $scope.produto.NotaApi = retorno;
                    });
                } else {
                    $scope.produto.NotaApi = retorno;
                }
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

            $scope.trocarImagemDestacada = (nome) => {
                $scope.produto.imagens.forEach(item => {
                    if (item.nome === nome) {
                        item.destacada = true;
                        $scope.produto.imagemDestacada = nome;
                    } else {
                        item.destacada = false;
                    }
                });
            }
        }
    ]);