window.onload = function(){
	var oBtn = document.getElementById("btn");
	var oSnackBox = getClass("snackBox")[0];
	var oSnackList = getClass("snackList",oSnackBox)[0];
	var oTarget = getClass("target",oSnackBox)[0];
	var aLi = oSnackList.getElementsByTagName("li");
	var iW = aLi[0].offsetWidth;
	var timer = null;

	//随机目标div的位置
	position();
	function position(){
		oTarget.style.left = Math.round(Math.random()*19)*iW +'px';
		oTarget.style.top = Math.round(Math.random()*19)*iW +'px';
	}

	//点击开始游戏
	oBtn.onclick = function(){

		var iL = aLi[0].offsetLeft;
		var iT = aLi[0].offsetTop;
		//默认向右走
		go("left",iL,iW);
		function go(attr,speed,iW){
			if(timer){
				clearInterval(timer);
			}
			timer = setInterval(function(){

				//检测碰到了目标值
				if(collision(aLi[0],oTarget)){
					position();
					var oLi = document.createElement("li");
					oSnackList.appendChild(oLi);
					clearInterval(timer);
					return;
				}

				//判断是否超出边界
				speed = speed + iW;
				if(speed > (oSnackList.offsetWidth-iW)){
					clearInterval(timer);
					speed = oSnackList.offsetWidth-iW;
					alert("game over!");
				}else if(speed < 0){
					clearInterval(timer);
					speed = 0;
					alert("game over!");
				}
				// aLi[0].style[attr] = speed + 'px';
				var x = 0;
				var y = 0;  
				for(var j = 0; j <aLi.length; j++){
					var l = aLi[j].offsetLeft;
					var t = aLi[j].offsetTop;
					if(j!=0){
						aLi[j].style.left = x +"px";
						aLi[j].style.top = y + "px";
					}else{
						aLi[j].style[attr] = speed + "px";
					}
					x = l;
					y = t;
				};
			},400);

			
		}
		//添加键盘事件
		document.onkeydown = function(ev){
			var e = ev||event;
			iL = aLi[0].offsetLeft;
			iT = aLi[0].offsetTop;

			switch( e.keyCode ){
				//向左走
				case 37:
					go("left",iL,-iW);
				break;
				//向上走
				case 38:
					go("top",iT,-iW);
				break;
				//向右走
				case 39:
					go("left",iL,iW);
				break;
				//向下走
				case 40:
					go("top",iT,iW);
				break;
			};
		}
	}


}