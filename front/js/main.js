$(document).ready(function() {
	$("#simular").click(function(event) {
		var corridas = $("#cantCorridas").val();
		var tiempoFinal = $("#timeFinal").val();
		var tamanioPedido = $("#tp").val();
		var costoAlm = $("#calm").val();
		var costoVtaPerd = $("#cvp").val();
		var precioCompra = $("#pc").val();
		var precioVenta = $("#pv").val();

		if (!(corridas && tiempoFinal && tamanioPedido && costoAlm && costoVtaPerd && precioCompra && precioVenta)) {
			alert("Campos erroneos o vacios");
			return;
		};
		if (corridas <=0 || tiempoFinal <=0 || tamanioPedido <=0 || costoAlm <=0 || costoVtaPerd <=0 || precioCompra <=0 || precioVenta <=0) {
			alert("Ningun campo puede ser menor a 1");
			return;
		};

		var resultados = $("#resultados");
		resultados.empty();
		var acumuladores = [0,0,0,0,0];
		for (var i = 0; i < corridas; i++) {
			results = simulador(tiempoFinal,tamanioPedido,costoAlm,costoVtaPerd,precioCompra,precioVenta);
			var ganancia = results[0] - results[1] - results[2] - results[3];
			acumuladores[0] += results[0];
			acumuladores[1] += results[1];
			acumuladores[2] += results[2];
			acumuladores[3] += results[3];
			acumuladores[4] += ganancia;
			resultados.append('<tr><th>'+(i+1)+'</th><td>'+results[0]+'</td><td>'+results[1]+'</td><td>'+results[2]+'</td><td>'+results[3]+'</td><td>'+ganancia+'</td></tr>')
		};
		resultados.append('<tr><th>Promedios</th><th>'+Math.round(acumuladores[0]/corridas)+'</th><th>'+Math.round(acumuladores[1]/corridas)+'</th><th>'+Math.round(acumuladores[2]/corridas)+'</th><th>'+Math.round(acumuladores[3]/corridas)+'</th><th>'+Math.round(acumuladores[4]/corridas)+'</th></tr>')
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
				fechaLlegada = t + generarDe();
			};
		}
		return [Math.round(vta),Math.round(scostoAlm),Math.round(scostoVtaPerd),Math.round(sprecioCompra)];
	}

	generarVd = function () {
		var media = 59.67;
		var variance = 1341.07;
		return genlognormal(media,variance);
	}

	generarDe = function () {
		return 3
	}

	genlognormal = function (media, varianza) {
        var r = [],
        	i = 0,
	        suma = 0,
	        mediacuadrada = 0,
	        primerm = 0,
	        segundom = 0;
        
        for (i = 1; i <= 12; i += 1) {
            r[i] = Math.random();
        }
        
        for (i = 1; i <= 12; i += 1) {
            suma = suma + r[i];
        }
        mediacuadrada = Math.pow(media, 2);
        primerm = (suma - 6) * Math.sqrt(Math.log(1 + (varianza / mediacuadrada)));
        segundom = Math.log(mediacuadrada / Math.sqrt(mediacuadrada + varianza));
        return Math.pow(Math.E, (primerm + segundom));
    }

})