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

	var zonaDerecha = false;
	var zonaIzquierda = false;

<<<<<<< HEAD
	var cantZorro = 0;
	var cantOveja = 0;
	var cantCol = 0;
=======
	var cantMisioneros=0;
	var cantCanibales=0;
>>>>>>> master

	var moverLancha = false;
	var lanchaEnOrillaDestino = false;

	var background = new Image();
	var baseRio = new Image();
	var agua = new Image();
	var imagenLancha = new Image();
<<<<<<< HEAD

=======
>>>>>>> master
	background.src = 'img/fondo.png';
	baseRio.src = 'img/base_rio.png';
	agua.src = 'img/agua.png';
	imagenLancha.src = 'img/lancha.png';

	var granjero = new Image();
	var zorro = new Image();
	var oveja = new Image();
	var col = new Image();
<<<<<<< HEAD
	
=======
>>>>>>> master
	granjero.src = 'img/Farmer.png';
	zorro.src = "img/zorro.png";
	oveja.src = "img/oveja.png";
	col.src = "img/col.png";

<<<<<<< HEAD
	
=======
	/*--- Objetos ---*/
	//para escalar las imagenes en el tercer y cuarto parametro aumentar el tamaño :D
	//var m1 = new personaje(680,142,34,67,'misionero 1',0, spritesMisioneroIzquierda, spritesMisioneroDerecha);
>>>>>>> master
	var lancha = new personaje(526,198,108,52,'lancha',0, imagenLancha, imagenLancha);

	var listaPersonajes = [];

	
	/*--- Funcion init ---*/
	function init() {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		canvas.width = 900;
		canvas.height = 288;

		//listaPersonajes.push(new personaje(640,142,34,67,'granjero',0,granjero,granjero, 230));
		listaPersonajes.push(new personaje(640,158,50,50,'zorro',0,zorro,zorro, 230));
		listaPersonajes.push(new personaje(690,158,50,50,'oveja',0,oveja,oveja, 180));
		listaPersonajes.push(new personaje(740,158,50,50,'col',0,col,col, 130));
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
		for(var i = 0; i < listaPersonajes.length; i++)
		{
			listaPersonajes[i].setPosition(listaPersonajes[i].xOrigen,listaPersonajes[i].yOrigen,0,0);
			listaPersonajes[i].orilla = 0;
			listaPersonajes[i].mouseEncima = 0;
			listaPersonajes[i].inicioSprite = 0;
		}

		lancha.setPosition(lancha.xOrigen, lancha.yOrigen);
		zonaDerecha = false;
		zonaIzquierda = false;
<<<<<<< HEAD
=======
		cantMisioneros=0;
		cantCanibales=0;
>>>>>>> master
		moverLancha = false;
		lanchaEnOrillaDestino = false;
	}

	/*--- Funcion act ---*/
	function act() 
	{
		if(!gameover && !winner)
		{
			for(var i = 0;i < listaPersonajes.length; i++)
			{
				if(listaPersonajes[i].intersects(mousex,mousey))//si el mouse esta sobre el personaje
				{
					if(!moverLancha)
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

									listaPersonajes[i].setPosition(listaPersonajes[i].xDestino-50,listaPersonajes[i].yDestino,1,0);
									listaPersonajes[i].inicioSprite = 0;
								}
								else
								{
									if(!zonaDerecha)
									{
								
										listaPersonajes[i].setPosition(323,170,0,1);
										zonaDerecha = true;
									}
									else if(!zonaIzquierda)
									{
										
										listaPersonajes[i].setPosition(293,170,1,1);
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
								}
								else
								{
									if(!zonaDerecha)
									{
										
										listaPersonajes[i].setPosition(544,170,0,1);
										zonaDerecha = true;
									}
									else if(!zonaIzquierda)
									{
									
										listaPersonajes[i].setPosition(544,170,1,1);
										zonaIzquierda = true;
									}
									
								}
							}
						}
					}
				}
				else listaPersonajes[i].mouseEncima = 0;
			}
		}
		if(lastPress == KEY_ENTER)
		{
			if(zonaDerecha || zonaIzquierda) moverLancha = true;
			if(gameover)gameover=false;
			if(winner)winner=false;
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

<<<<<<< HEAD

		if(moverLancha && !lanchaEnOrillaDestino)
		{	
=======
		if(moverLancha && !lanchaEnOrillaDestino)
		{
>>>>>>> master
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
				verificar();
			} 
		}
		else if(moverLancha && lanchaEnOrillaDestino)
		{
<<<<<<< HEAD
			for(var i = 0; i < listaPersonajes.length; i++)
=======
			for(var i = 0;i < listaPersonajes.length; i++)
>>>>>>> master
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
				verificar();
			}
		}
		
<<<<<<< HEAD
	
		for(var i = 0; i < listaPersonajes.length; i++)
		{	
			
=======
		

		for(var i = 0; i < listaPersonajes.length; i++)
		{	
			ctx.strokeRect(listaPersonajes[i].x, listaPersonajes[i].y, listaPersonajes[i].width, listaPersonajes[i].height);
			//ctx.fillRect(listaPersonajes[i].width,listaPersonajes[i].height,canvas.width,canvas.height);
>>>>>>> master
			if(listaPersonajes[i].name == 'zorro')
			{
				if(listaPersonajes[i].mouseEncima)listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual, 0, 0, 30, 24);
				else listaPersonajes[i].drawImageArea(ctx, listaPersonajes[i].spriteActual, 0, 0, 30, 24);
			}
			else if(listaPersonajes[i].name == 'oveja')
			{
				if(listaPersonajes[i].mouseEncima)listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual, 0, 0, 30, 25);
				else listaPersonajes[i].drawImageArea(ctx, listaPersonajes[i].spriteActual, 0, 0, 30, 25);

			}
			else
			{
				if(listaPersonajes[i].mouseEncima)listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual,0,0, 43, 28);
				else listaPersonajes[i].drawImageArea(ctx,listaPersonajes[i].spriteActual, 0 ,0, 43, 28);
			}
			
		}
		lancha.drawImageArea(ctx, lancha.spriteActual, 0, 0, 59, 35);

<<<<<<< HEAD

		if(listaPersonajes[0].orilla==1 && listaPersonajes[1].orilla==1 && listaPersonajes[2].orilla==1) {
			winner = true;
			ctx.textAlign = 'center';
			ctx.font="40px Arial Black";
			ctx.fillStyle = 'white';
			ctx.fillText('WINNER', 450, 144);
			ctx.font="20px Arial";
			ctx.fillText('(Pulsa Enter para reiniciar)',450,164);
			reset();
		}

		else if(gameover)
=======
		if(gameover || winner)
>>>>>>> master
		{
			ctx.textAlign = 'center';
			ctx.font="40px Arial Black";
			ctx.fillStyle = 'white';
<<<<<<< HEAD
			ctx.fillText('GAME OVER', 450, 144);
=======
			if(gameover)
			{
				ctx.fillText('GAME OVER', 450, 144);
			}
			else if(winner)
			{
				ctx.fillText('WINNER', 450, 144);
			}
>>>>>>> master
			ctx.font="20px Arial";
			ctx.fillText('(Pulsa Enter para reiniciar)',450,164);
			reset();
		}
<<<<<<< HEAD
=======
		
>>>>>>> master
	}

	function verificar()
	{
<<<<<<< HEAD
		for(var i = 0; i < listaPersonajes.length; i++)
		{	
			if(listaPersonajes[i].name == 'zorro' && listaPersonajes[i].orilla==1) cantZorro = 1;
			if(listaPersonajes[i].name == 'oveja' && listaPersonajes[i].orilla==1) cantOveja = 1;
			if(listaPersonajes[i].name == 'col' && listaPersonajes[i].orilla==1) cantCol = 1;
		}

		if((cantZorro == cantOveja && cantOveja != cantCol && listaPersonajes[0].sentado == 0 && listaPersonajes[1].sentado == 0) || 
			(cantOveja == cantCol && cantOveja != cantZorro && listaPersonajes[1].sentado == 0 && listaPersonajes[2].sentado == 0)) gameover = true;

		cantZorro = 0;
		cantOveja = 0;
		cantCol = 0;

		for(var i = 0;i < listaPersonajes.length; i++)
		{
			if(listaPersonajes[i].name == 'zorro' && listaPersonajes[i].orilla==0) cantZorro = 0;
			if(listaPersonajes[i].name == 'oveja' && listaPersonajes[i].orilla==0) cantOveja = 0;
			if(listaPersonajes[i].name == 'col' && listaPersonajes[i].orilla==0) cantCol = 0;
		}

		if((cantZorro == cantOveja && cantOveja != cantCol && listaPersonajes[0].sentado == 0 && listaPersonajes[1].sentado == 0) || 
			(cantOveja == cantCol && cantOveja != cantZorro && listaPersonajes[1].sentado == 0 && listaPersonajes[2].sentado == 0)) gameover = true;


		cantZorro = 0;
		cantOveja = 0;
		cantCol = 0;
=======
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
>>>>>>> master
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
<<<<<<< HEAD
	
=======
	/*
		para crear un objeto de tipo personaje seria asi:
		var m1 = new personaje(50,50,100,60,'misionero 1',,);
	*/

>>>>>>> master
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
		this.inicioSprite = 30;
		this.spriteActual = (this.sentido == 0) ? this.spriteIzquierda : this.spriteDerecha;
		this.sentado = (sentado == null) ? 0 : sentado;
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