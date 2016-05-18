import * as angular from 'angular';

var component = angular.module('app.modules.dashboard.bank-list', [

])
	.directive('bankList', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				title: '@'
			},
			bindToController: true,
			controller: function() {
				var ctrl = this;

				var data = [
					{
						columnA: "Data 1",
						columnB: "Data 2",
						columnC: 200000,
						columnD: "2015/08/24"
					},
					{
						columnA: "Data 3",
						columnB: "Data 4",
						columnC: 100000,
						columnD: "2015/09/24"
					},
					{
						columnA: "Data 5",
						columnB: "Data 6",
						columnC: 500000,
						columnD: "2015/04/24"
					},
					{
						columnA: "Data 7",
						columnB: "Data 8",
						columnC: 300000,
						columnD: "2015/10/24"
					},
					{
						columnA: "Data 9",
						columnB: "Data 10",
						columnC: 700000,
						columnD: "2015/06/24"
					},
					{
						columnA: "Data 11",
						columnB: "Data 12",
						columnC: 350000,
						columnD: "2015/01/24"
					},
					{
						columnA: "Data 13",
						columnB: "Data 14",
						columnC: 450000,
						columnD: "2015/06/18"
					}
				];

				var columns = [
					{
						headerName: "Column A",
						field: "columnA"
					},
					{
						headerName: "Column B",
						field: "columnB"
					},
					{
						headerName: "Column C",
						field: "columnC",
						cellStyle: { 'text-align': 'right' }
					},
					{
						headerName: "Column D",
						field: "columnD"
					}
				];

				ctrl.gridOptions = {
					enableColResize: true,
					checkboxSelection: true,
					rowSelection: "multiple",
					columnDefs: columns,
					rowData: data,
					enableSorting: true,
					enableFilter: true
				};
			},
			controllerAs: 'ctrl',
			template: require('./bank-list.html')
		};
	}).name;

export = component;
