padaApp.controller('calendarController', ['$scope' ,'restClient', function(scope, restClient) {
	
	scope.events = [];
	
	scope.eventSources = {
		    events: scope.events,
	        color: 'orange',   
	        textColor: 'black',
	};
	
	scope.alertOnEventClick = function( date, jsEvent, view){
        console.log(date.title + ' was clicked ' + date.id);
    };
	
	scope.getAllSalesOk = function(response){
		
		var toEvent = function(sale){
			var event = {
				id: sale.id,
				title: sale.client.firstName + ' ' + sale.client.lastName,
				start: moment(sale.date),
				end: moment(sale.date).add(30, 'minutes'),
				allDay: false
			};
			scope.events.push(event);
		};
		
		response.map( toEvent );
		
		scope.uiConfig = {
			      calendar:{
			        height: 550,
			        editable: true,
			        header:{
			          left: 'month agendaWeek agendaDay',
			          right: 'today prev,next'
			        },
			        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			        dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'],
			        dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
			        buttonText: {
			            today: 'Hoy',
			            month: 'Mes',
			            week: 'Semana',
			            day: 'Dia'
			           },
			        eventClick: scope.alertOnEventClick,
			        eventDrop: scope.alertOnDrop,
			        eventResize: scope.alertOnResize
			      }
			    };
	}
	
	restClient.sendGetWithoutErrorCallback(scope.getAllSalesOk, '/sales/all');
}]);	