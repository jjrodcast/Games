(function () {
	'use strict';
	window.addEventListener('load', init, false);
	var KEY_ENTER = 13;
	var canvas = null,
	ctx = null;
	var lastPress = null;
	var gameover = false;
	var winner = false;
	var mousex=0,mousey=0;
	var flagmouseover=false;
	var totalEnLancha = 0;
	var zonaDerecha = false;
	var zonaIzquierda = false;

	var cantMisioneros=0;
	var cantCanibales=0;

	var moverLancha = false;
	var lanchaEnOrillaDestino = false;

	var background = new Image();
	var baseRio = new Image();
	var agua = new Image();
	var imagenLancha = new Image();
	background.src = 'img/fondo.png';
	baseRio.src = 'img/base_rio.png';
	agua.src = 'img/agua.png';
	imagenLancha.src = 'img/lancha.png';

	/*--- Sprites ---*/
	var spritesMisioneroIzquierda = new Image();
	var spritesMisioneroDerecha = new Image();
	var spritesCanibalIzquierda = new Image();
	var spritesCanibalDerecha = new Image();
	spritesMisioneroIzquierda.src = 'img/misionero_izquierda.png';
	spritesMisioneroDerecha.src = 'img/misionero_derecha.png';
	spritesCanibalIzquierda.src = 'img/canibal_izquierda.png';
	spritesCanibalDerecha.src = 'img/canibal_derecha.png';
	/*--- Fin Sprites ---*/

	/*--- Objetos ---*/
	//para escalar las imagenes en el tercer y cuarto parametro aumentar el tamaño :D
	//var m1 = new personaje(680,142,34,67,'misionero 1',0, spritesMisioneroIzquierda, spritesMisioneroDerecha);
	var lancha = new personaje(526,198,108,52,'lancha',0, imagenLancha, imagenLancha);

	var listaPersonajes = [];
	/*---------------*/
	
	/*--- Funcion init ---*/
	function init() {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		canvas.width = 900;
		canvas.height = 288;

		listaPersonajes.push(new personaje(640,142,34,67,'misionero',0,spritesMisioneroIzquierda,spritesMisioneroDerecha, 230));
		listaPersonajes.push(new personaje(680,142,34,67,'misionero',0,spritesMisioneroIzquierda,spritesMisioneroDerecha, 190));
		listaPersonajes.push(new personaje(720,142,34,67,'misionero',0,spritesMisioneroIzquierda,spritesMisioneroDerecha, 150));

		listaPersonajes.push(new personaje(760,142,33,67,'canibal',0,spritesCanibalIzquierda,spritesCanibalDerecha, 110));
		listaPersonajes.push(new personaje(800,142,33,67,'canibal',0,spritesCanibalIzquierda,spritesCanibalDerecha, 70));
		listaPersonajes.push(new personaje(840,142,33,67,'canibal',0,spritesCanibalIzquierda,spritesCanibalDerecha, 30));

		enableInputs();
		run();
		repaint();
	}

	/*--- Funcion run --*/
	function run() {
		setTimeout(run, 50);
		act();
	}

	/*--- Funcion repaint ---*/
	function repaint() {
		requestAnimationFrame(repaint);
		paint(ctx);
	}

	/*--- Funcion reset ---*/
	function reset() 
	{

	}

	/*--- Funcion act ---*/
	function act() 
	{
		for(var i = 0;i < listaPersonajes.length; i++)
		{
			if(listaPersonajes[i].intersects(mousex,mousey))//si el mouse esta sobre el personaje
			{
				listaPersonajes[i].mouseEncima = 1;
				if(lastPress==1)//si se presiono el click izquierdo encima del personaje
				{

					if(lanchaEnOrillaDestino && listaPersonajes[i].orilla)
					{
						if(listaPersonajes[i].sentado==1)//si esta sentado que vuelva a la orilla
						{

							if(listaPersonajes[i].x==323)zonaDerecha=false;
							else if(listaPersonajes[i].x==293)zonaIzquierda=false;

							listaPersonajes[i].setPosition(listaPersonajes[i].xDestino,listaPersonajes[i].yDestino,1,0);
							listaPersonajes[i].inicioSprite = 0;
							totalEnLancha--;
						}
						else
						{
							if(totalEnLancha < 2 && !zonaDerecha)
							{
								listaPersonajes[i].setPosition(323,169,0,1);
								totalEnLancha++;
								zonaDerecha = true;
							}
							else if(totalEnLancha < 2 && !zonaIzquierda)
							{
								listaPersonajes[i].setPosition(293,169,1,1);
								totalEnLancha++;
								zonaIzquierda = true;
							}
						}
					}
					else if(!lanchaEnOrillaDestino && !listaPersonajes[i].orilla)
					{
						if(listaPersonajes[i].sentado==1)//si esta sentado que vuelva a la orilla
						{
							if(listaPersonajes[i].x==574)zonaDerecha=false;
							else if(listaPersonajes[i].x==544)zonaIzquierda=false;

							listaPersonajes[i].setPosition(listaPersonajes[i].xOrigen,listaPersonajes[i].yOrigen,0,0);
							listaPersonajes[i].inicioSprite = 0;
							totalEnLancha--;
						}
						else
						{
							if(totalEnLancha < 2 && !zonaDerecha)
							{
								listaPersonajes[i].setPosition(574,169,0,1);
								totalEnLancha++;
								zonaDerecha = true;
							}
							else if(totalEnLancha < 2 && !zonaIzquierda)
							{
								listaPersonajes[i].setPosition(544,169,1,1);
								totalEnLancha++;
								zonaIzquierda = true;
							}
							
						}
					}
				}
			}
			else listaPersonajes[i].mouseEncima = 0;
		}
		
		if(lastPress == KEY_ENTER)
		{
			if(totalEnLancha>0)moverLancha = true;
		}//si se presiona la tecla ENTER se activa la bandera para mover la lancha.

		lastPress = -1;
	}


	function paint(ctx) 
	{
		//Dibujar imagen de fondo
		if(background.width)
		{
			ctx.drawImage(background,0,0,900,288);
		}
		else
		{
			ctx.fillStyle = '#000';
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}
		//Dibujar base de rio
		ctx.drawImage(baseRio,0,canvas.height-80,900,80);
		//Dibujar agua
		ctx.drawImage(agua,275,canvas.height-82,348,82);

		if(moverLancha && !lanchaEnOrillaDestino)
		{
			for(var i = 0;i < listaPersonajes.length; i++)
			{
				if(listaPersonajes[i].sentado)listaPersonajes[i].x -= 1;
			}
			lancha.x -= 1;
			if(lancha.x<=275)
			{
				for(var i = 0;i < listaPersonajes.length; i++)
				{
					if(listaPersonajes[i].sentado)listaPersonajes[i].orilla = 1;
				}
				lanchaEnOrillaDestino = true;
				moverLancha = false;
				//
				verificar();
			} 
		}
		else if(moverLancha && lanchaEnOrillaDestino)
		{
			for(var i = 0;i < listaPersonajes.length; i++)
			{
				if(listaPersonajes[i].sentado)listaPersonajes[i].x += 1;
			}
			lancha.x += 1;
			if(lancha.x >=526)
			{
				for(var i = 0;i < listaPersonajes.length; i++)
				{
					if(listaPersonajes[i].sentado)listaPersonajes[i].orilla = 0;
				}
				lanchaEnOrillaDestino = false;
				moverLancha = false;
				//
				verificar();
			}
		}
		
		if(gameover)window.console.warn("perdio");
		if(winner)window.console.warn("ganaste");

		for(var i = 0;i < listaPersonajes.length; i++)
		{
			if(listaPersonajes[i].name == 'misionero')
			{
				if(listaPersonajes[i].mouseEncima)listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual, 23, 0, 23, 45);
				else listaPersonajes[i].drawImageArea(ctx, listaPersonajes[i].spriteActual, listaPersonajes[i].inicioSprite, 0, 23, 45);
			}
			else
			{
				if(listaPersonajes[i].mouseEncima)listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual,21,0,21,43);
				else listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual, listaPersonajes[i].inicioSprite,0,21,43);
			}
			
		}
		lancha.drawImageArea(ctx, lancha.spriteActual, 0, 0, 59, 35);
	}

	function verificar()
	{
		for(var i = 0;i < listaPersonajes.length; i++)
		{
			if(listaPersonajes[i].name == 'misionero' && listaPersonajes[i].orilla==1)cantMisioneros++;
			if(listaPersonajes[i].name == 'canibal' && listaPersonajes[i].orilla==1)cantCanibales++;
		}


		if(cantCanibales > cantMisioneros && cantMisioneros > 0)gameover=true;
		if(cantMisioneros == cantCanibales && lanchaEnOrillaDestino && cantCanibales + cantMisioneros == 6)winner=true;

		cantMisioneros = 0;
		cantCanibales = 0;
		for(var i = 0;i < listaPersonajes.length; i++)
		{
			if(listaPersonajes[i].name == 'misionero' && listaPersonajes[i].orilla==0)cantMisioneros++;
			if(listaPersonajes[i].name == 'canibal' && listaPersonajes[i].orilla==0)cantCanibales++;
		}

		if(cantCanibales > cantMisioneros && cantMisioneros > 0)gameover=true;


		cantMisioneros = 0;
		cantCanibales = 0;
	}

	function enableInputs()
	{ 
		document.addEventListener('mousemove',
			function(evt)
			{ 
				mousex=evt.pageX-canvas.offsetLeft; 
				mousey=evt.pageY-canvas.offsetTop; 
			},false); 
		canvas.addEventListener('mousedown', function(evt){ lastPress = evt.which; },false);
		document.addEventListener('keydown', function (evtx) { lastPress = evtx.which; }, false);
	}
	/*
		para crear un objeto de tipo personaje seria asi:
		var m1 = new personaje(50,50,100,60,'misionero 1',,);
	*/

	function personaje(x, y, width, height, name, sentido, spriteIzquierda, spriteDerecha, xDestino, yDestino, inicioSprite, sentado, orilla)
	{
		this.x = (x == null) ? 0 : x;
		this.y = (y == null) ? 0 : y;
		this.width = (width == null) ? 0 : width;
		this.height = (height == null) ? this.width : height;
		this.name = (name == null) ? 'sin nombre' : name;
		this.sentido = (sentido == null) ? 0 : sentido;//0 es izquierda, 1 es derecha
		this.spriteIzquierda = spriteIzquierda;
		this.spriteDerecha = spriteDerecha;
		this.spriteActual = (this.sentido == 0) ? this.spriteIzquierda : this.spriteDerecha;
		this.inicioSprite = (inicioSprite == null) ? 0 : inicioSprite;
		//si sentado es 0, entonces es falso por lo tanto esta de pie :v...que genio
		this.sentado = (sentado == null) ? 0 : sentado;//ademas con esto podemos saber si el personaje esta en la lancha :P
		//orilla = 0 es origen, 1 es destino
		this.orilla = (orilla == null) ? 0 : orilla;
		this.mouseEncima = 0;
		this.xOrigen = this.x;
		this.yOrigen = this.y;
		this.xDestino = (xDestino == null) ? this.x : xDestino;
		this.yDestino = (yDestino == null) ? this.y : yDestino;
	}

	personaje.prototype.setPosition = function(x, y, sentido, sentado, inicioSprite)
	{
		this.x = x;
		this.y = y;
		this.sentido = sentido;
		this.inicioSprite = 46;
		this.spriteActual = (this.sentido == 0) ? this.spriteIzquierda : this.spriteDerecha;
		this.sentado = sentado;
	}

	personaje.prototype.drawImageArea = function(ctx, img, sx, sy, sw, sh)
	{
		if(img.width) ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
		else ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	personaje.prototype.intersects = function (x, y) 
	{ 
		if (x == null || y == null) 
		{ 
			window.console.warn('Missing parameters on function intersects'); 
		} else 
		{ 
			return (this.x < x && this.x + this.width > x && this.y < y && this.y + this.height > y); 
		} 
	}
	
	window.requestAnimationFrame = (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 17);
		};
	})();


})();

