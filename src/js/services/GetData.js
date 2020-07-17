angular.module('eTurnApp')
    .factory('GetData', ['$location', '$q', function ($location, $q) {
        return {
            get: function (url, params) {

                // se params undefined entao pegar todos os produtos
                // se params tem valor entao buscar o id do produto passado
                // var jsonfile = require('jsonfile')
                var d = $q.defer();
                var file = url;
                var retorno = null;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", file, false);
                xmlhttp.send();
                if (xmlhttp.status == 200) {
                    retorno = xmlhttp.responseText;
                    retorno = JSON.parse(retorno);
                    if (params) {
                        retorno = retorno.filter(x => x.id.toString() === params.toString())[0];
                    }
                    d.resolve(retorno);
                }
                return d.promise;
            }
        }
    }])
    .factory('GetNotasApi', ['$q', '$http', function ($q, $http) {
        return {
            get: function(expr) {
                var server_url = 'http://api.mathjs.org/v4?expr=' + expr ;
                var d = $q.defer();
                $http({
                    method: "GET",
                    url: server_url,
                }).then(function(res) {
                    if (res.status === 200 && res.data) {
                        let numero = Number(res.data);
                        if (numero.toString().indexOf('.') >= 0) {
                            numero = round(numero, 1);
                        }
                        d.resolve(numero);
                    } else {
                        console.log('Erro buscando API mathjs');
                        d.reject();
                    }
                });
                return d.promise;

            }
        }
    }]);

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }