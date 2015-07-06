$(document).ready(function() {
	$("#simular").click(function(event) {
		var corridas = $("#cantCorridas").val();
		var tiempoFinal = $("#timeFinal").val();
		var tamanioPedido = $("#tp").val();
		var costoAlm = $("#calm").val();
		var costoVtaPerd = $("#cvp").val();
		var precioCompra = $("#pc").val();
		var precioVenta = $("#pv").val();
		var resultados = $("#resultados");
		resultados.empty();
		for (var i = 0; i < corridas; i++) {
			results = simulador(tiempoFinal,tamanioPedido,costoAlm,costoVtaPerd,precioCompra,precioVenta);
			resultados.append('<tr><th>'+(i+1)+'</th><td>'+results+'</td></tr>')
		};
	});

	simulador = function (tiempoFinal,tamanioPedido,costoAlm,costoVtaPerd,precioCompra,precioVenta) {
		var t = 0;
		var deltat = 1;
		var st = 0;
		var fechaLlegada = 1;
		var scostoAlm = 0
		var scostoVtaPerd = 0;
		var vta = 0;
		var sprecioCompra = 0;
		while (t < tiempoFinal) {
			t = t + deltat;
			if (t == fechaLlegada) {
				st += tamanioPedido;
				sprecioCompra += tamanioPedido * precioCompra;
			};
			var vd = generarVd();
			if (st >= vd) {
				st = st - vd;
				scostoAlm += st*costoAlm;
				vta += vd * precioVenta;
			} else{
				var vp = vd - st;
				scostoVtaPerd += vp * costoVtaPerd;
				vta += st * precioVenta;
				st = 0;
			};
			if (st == 0 && fechaLlegada < t) {
				fll = t + generarDe();
			};
		}
		return (vta - scostoAlm - scostoVtaPerd - sprecioCompra);
	}

	generarVd = function () {
		
		return 2
	}

	generarDe = function () {
		return 3
	}

})