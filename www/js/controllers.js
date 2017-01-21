angular.module('prodag.controllers', [])

// APP
.controller('AppCtrl', function($scope, $ionicConfig) {
	$scope.$on("$ionicView.beforeEnter", function() {
		//console.log('test33');
	});
})

.controller('HomeCtrl', function($scope, $state, $templateCache, $q, $rootScope, $ionicPopup) {
	$scope.$on("$ionicView.beforeEnter", function() {
		console.log('test');
	});
})

.controller('AboutMeCtrl', function($scope, $state, $templateCache, $q, $rootScope, $ionicPopup) {
	$scope.$on("$ionicView.beforeEnter", function() {
		console.log('aboutme');
	});
})

.controller('CultivosCtrl', function($scope, $state, $templateCache, $http) {
	$scope.$on("$ionicView.beforeEnter", function() {
	  	var response = null;

	    var cultivos = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/cultivos',
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
			response = JSON.parse(JSON.stringify(response));
			$scope.cultivos = response;
			console.log('integrations');
			console.log($scope.integrations);
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});

	});

})

.controller('CultivosDescripcionCtrl', function($scope, $state, $templateCache, $stateParams, $http) {
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.cultivo = {
			"id": "1",
			"nombre": "Cultivo 1"
		};
		console.log($scope.cultivo);
	});
})

.controller('CultivosStatsCtrl', function($scope, $state, $templateCache, $stateParams, $http) {
	$scope.$on("$ionicView.beforeEnter", function() {
		var response = null;
	  	
	  	var cultivoId = $stateParams.cultivoId;
	  	$scope.cultivoId = cultivoId;
	    var cultivos = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/cultivo-stats/' + cultivoId,
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
	    	response = JSON.parse(JSON.stringify(response));
			$scope.cultivo = response;
			//console.log($scope.cultivo);
			var state_titles = [];
			var state_data = [];
			/*
			var city_titles = [];
			var city_data = [];
			*/
			angular.forEach($scope.cultivo.states, function(state) {
				state_titles.push(state.state_title);
				state_data.push(state.sum_valor_productivo);
				$scope.state_title = state.state_title;
			});
			/*
			angular.forEach($scope.cultivo.cities, function(city) {
				city_titles.push(city.city_title);
				city_data.push(city.sum_valor_productivo);
				$scope.city_title = city.state_title;
			});
			*/
			$scope.graph = {};
			$scope.graph.state_labels = state_titles;
  			$scope.graph.state_data = state_data;
			/*
			$scope.graph.city_labels = city_titles;
  			$scope.graph.city_data = city_data;
  			*/
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});
		$scope.estados = [{
			"id": "1",
			"nombre": "Estado 1"
		}, {
			"id": "2",
			"nombre": "Estado 2"
		}];

		$scope.municipios = [{
			"id": "1",
			"nombre": "Municipio 1"
		}, {
			"id": "2",
			"nombre": "Municipio 2"
		}];
        //$scope.cultivos = JSON.parse($scope.cultivos);
		//console.log($scope.cultivo);
	});
})

.controller('EstadosCtrl', function($scope, $state, $templateCache, $http) {
	$scope.$on("$ionicView.beforeEnter", function() {
	  	var response = null;

	    var cultivos = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/estados',
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
			response = JSON.parse(JSON.stringify(response));
			$scope.estados = response;
			console.log('integrations');
			console.log($scope.integrations);
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});

	});
})

.controller('EstadosStatsCtrl', function($scope, $state, $templateCache, $stateParams, $http) {
	$scope.$on("$ionicView.beforeEnter", function() {
		var response = null;
	  	
	  	var estadoId = $stateParams.estadoId;
	  	$scope.estadoId = estadoId;
	    var cultivos = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/estado-cultivos/' + estadoId,
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
	    	response = JSON.parse(JSON.stringify(response));
			$scope.cultivos = response;
			console.log($scope.cultivos);
			var titles = [];
			var data = [];
			angular.forEach($scope.cultivos, function(cultivo) {
				titles.push(cultivo.title);
				data.push(cultivo.sum_valor_productivo);
				$scope.state_title = cultivo.state_title;
			});
			
			$scope.graph = {};
			$scope.graph.labels = titles;
  			$scope.graph.data = data;

		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});
	});
})

.controller('EstadosStatsCultivosCtrl', function($scope, $state, $templateCache, $stateParams, $http) {
	$scope.$on("$ionicView.beforeEnter", function() {
		var response = null;
	  	
	  	var estadoId = $stateParams.estadoId;
	  	var cultivoId = $stateParams.cultivoId;
	  	$scope.estadoId = estadoId;
	  	$scope.cultivoId = cultivoId;

	    var cultivos = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/estado-cultivos/' + estadoId + '/stats/' + cultivoId,
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
	    	response = JSON.parse(JSON.stringify(response));
			$scope.cities = response;
			console.log($scope.cities);
			//console.log($scope.municipios);
			var titles = [];
			var data = [];
			angular.forEach($scope.cities, function(city) {
				titles.push(city.city_title);
				data.push(city.sum_valor_productivo);
				$scope.crop_title = city.crop_title;
				$scope.state_title = city.state_title;
			});
			//console.log(data);
			$scope.graph = {};
			$scope.graph.labels = titles;
  			$scope.graph.data = data;

  			//chart-options=""
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});
	});
})

.controller('EstadosMunicipiosCtrl', function($scope, $state, $templateCache, $http, $stateParams) {
	$scope.$on("$ionicView.beforeEnter", function() {
	  	var response = null;
	  	
	  	var estadoId = $stateParams.estadoId;
	    var municipios = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/municipios/' + estadoId,
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
			response = JSON.parse(JSON.stringify(response));
			$scope.municipios = response;

		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});

	});
})

.controller('EstadosMunicipiosStatsCtrl', function($scope, $state, $templateCache, $http, $stateParams) {
	$scope.$on("$ionicView.beforeEnter", function() {
	  	var response = null;
	  	
	  	var estadoId = $stateParams.estadoId;
	  	var municipioId = $stateParams.municipioId;
	  	$scope.estadoId = estadoId;
	  	$scope.municipioId = municipioId;
	  	console.log($scope.municipioId);
	    var municipios = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/municipio/' + estadoId + '/' + municipioId,
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
			response = JSON.parse(JSON.stringify(response));
			$scope.cultivos = response;
			console.log('http://alimentandome.com/api2/municipio/' + estadoId + '/' + municipioId);
			console.log($scope.cultivos);

			var titles = [];
			var data = [];
			angular.forEach($scope.cultivos, function(cultivo) {
				titles.push(cultivo.title);
				data.push(cultivo.sum_valor_productivo);
				$scope.city_title = cultivo.city_title;
			});

			console.log(data);
			$scope.graph = {};
			$scope.graph.labels = titles;
  			$scope.graph.data = data;
  			
			/////////////////
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});

	});
})

.controller('EstadosMunicipiosCultivosStatsCtrl', function($scope, $state, $templateCache, $http, $stateParams) {
	$scope.$on("$ionicView.beforeEnter", function() {
	  	var response = null;
	  	
	  	var estadoId = $stateParams.estadoId;
	  	var municipioId = $stateParams.municipioId;
	  	var cultivoId = $stateParams.cultivoId;
	  	$scope.estadoId = estadoId;
	  	$scope.municipioId = municipioId;
	  	
	    var municipios = $http({
	    	method: 'GET',
	    	url: 'http://alimentandome.com/api2/municipio-stats/' + estadoId + '/' + municipioId + '/' + cultivoId,
	    	params: {
	    		format: 'jsonp',
	    		json_callback: 'JSON_CALLBACK'
	    	}
	    }).success(function (response) {
	    	//console.log(response);
			response = JSON.parse(JSON.stringify(response));
			$scope.cultivos = response;
			//console.log('status');
			//console.log('http://alimentandome.com/api2/municipio-stats/' + estadoId + '/' + municipioId + '/' + cultivoId);
			console.log($scope.cultivos);

			var years = [];
			var data = [];
			
			angular.forEach($scope.cultivos, function(cultivo) {
				years.push(cultivo.anio);
				data.push(cultivo.sum_valor_productivo);
				
				$scope.cultivo = cultivo.cultivo;
				$scope.municipio = cultivo.municipio;
			});
			//console.log(data);

			$scope.graph = {};
			$scope.graph.labels = years;

  			$scope.graph.data = data;
  			$scope.graph.options = {
  				scales: {
				    yAxes: [{
				      display: true,
				      ticks: {
				        display: true,
				        callback: function(value, index, values) {
				          return numberWithCommas(values[index]);
				        }
				      }
				    }]
				}
		    };
    		
  			//console.log($scope.graph);
			/////////////////
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data);
			console.log(status);
		});

	});

	var numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
})


;
