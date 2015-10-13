(function () {
	'use strict';
	window.addEventListener('load', init, false);
	var KEY_ENTER = 13;
	var canvas = null,
	ctx = null;
	var lastPress = null;
	var gameover = true;
	var mousex=0,mousey=0;
	var flagmouseover=false;

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
	var m1 = new personaje(680,142,34,67,'misionero 1',0, spritesMisioneroIzquierda, spritesMisioneroDerecha);
	var lancha = new personaje(535,198,88,52,'lancha',0, imagenLancha, imagenLancha);
	/*---------------*/
	
	/*--- Funcion init ---*/
	function init() {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		canvas.width = 900;
		canvas.height = 288;

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
		if(lastPress == KEY_ENTER){moverLancha = true;}//si se presiona la tecla ENTER se activa la bandera para mover la lancha.
		if(m1.intersects(mousex,mousey))//si el mouse esta sobre el personaje
		{
			//window.console.warn("intercepta!");
			flagmouseover = true;
			if(lastPress==1)//si se presiono el click izquierdo encima del personaje
			{
				if(lanchaEnOrillaDestino)
				{
					if(m1.sentado==1)//si esta sentado que vuelva a la orilla
					{
						m1.setPosition(200,142,1,0);
						m1.inicioSprite = 0;
					}
					else
					{
						m1.setPosition(314,169,0,1);
					}
				}
				else
				{
					if(m1.sentado==1)//si esta sentado que vuelva a la orilla
					{
						m1.setPosition(680,142,0,0);
						m1.inicioSprite = 0;
					}
					else
					{
						m1.setPosition(574,169,0,1);
					}
				}
				window.console.warn('x: ' + mousex + " y: " + mousey);
			}
		}
		else flagmouseover = false;

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
			m1.x -= 1;
			lancha.x -= 1;
			if(lancha.x<=275)
			{
				lanchaEnOrillaDestino = true;
				moverLancha = false;
				window.console.warn('x: ' + m1.x + " y: " + m1.y);
			} 
		}
		else if(moverLancha && lanchaEnOrillaDestino)
		{
			m1.x += 1;
			lancha.x += 1;
			if(lancha.x >=535)
			{
				lanchaEnOrillaDestino = false;
				moverLancha = false;
			}
		}

		//Dibujar misionero1
		//el tercer parametro permite moverse entre las siguiente figuras: aumentar en 23
		if(flagmouseover) m1.drawImageArea(ctx, m1.spriteActual, 23, 0, 23, 45);
		else m1.drawImageArea(ctx, m1.spriteActual, m1.inicioSprite, 0, 23, 45);
		
		lancha.drawImageArea(ctx, lancha.spriteActual, 0, 0, 59, 35);
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

	function personaje(x,y, width, height, name, sentido, spriteIzquierda, spriteDerecha, inicioSprite, sentado, orilla)
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
	}

	personaje.prototype.setPosition = function(x, y, sentido, sentado)
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

