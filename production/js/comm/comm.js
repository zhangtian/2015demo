//function startMove(obj,attr,iSpeed,iTarget, fnSucc)//1、对象；2、属性；3、速度；4、目标值；5、返回值；
//{
//	var iNow = css(obj,attr);//记录当前的值
//	var iSpeed = iNow > iTarget ? -Math.abs(iSpeed) : Math.abs(iSpeed);//如果当前的值大于目标值那么它的速度是个负数，否则还是取整的iSpeed
//	clearInterval(obj.oTimer);//清除当前对象的定时器
//	obj.oTimer = setInterval(function(){//给当前对象加定时器	
//		if(Math.abs(iTarget - iNow) < Math.abs(iSpeed)){
//			obj.style[attr] = iTarget + "px";//如果目标值减去当前值小于速度那么直接取目标值(如果速度不能被整除，避免最后的误差)
//			clearInterval(obj.oTimer);//清掉当前对象的定时器
//            fnSucc && fnSucc();
//		}
//		else{
//			iNow += iSpeed;//iNow每次都加等速度最后赋值给当前对象的属性
//			obj.style[attr] = iNow + "px";
//		}
//	},20);
//};

function startMove(obj,attr,iSpeed,iTarget,callBack)
{
	var iNow=css(obj,attr);
	iSpeed=iNow>iTarget?-Math.abs(iSpeed):Math.abs(iSpeed);
	clearInterval(obj.oTimer);
	obj.oTimer=setInterval(function(){	
		var iNow=css(obj,attr);
        if(isNaN(iNow)){
            iNow = 0;
        }
		if(Math.abs(iTarget-iNow)<Math.abs(iSpeed))
		{
			css(obj,attr,iTarget);
			clearInterval(obj.oTimer);
			obj.oTimer=0;
			callBack&&callBack();
		}
		else
		{
			iNow+=iSpeed;
			css(obj,attr,iNow);
		}
	},20);
}

//Math.abs 取绝对值(取正值)
function css(obj,attr,val)
{
	if(arguments.length>=3)//判断传的参数的个数
	{
		if(attr=="opacity")//如果第二个参数传入的是opacity
		{
			obj.style.opacity=val/100;//对象的透明度就是传入值除以100
			obj.style.filter="alpha(opacity="+val+")";//这个是ie的透明度兼容模式
		}
		else
		{
			obj.style[attr]=val+"px";//否则对象的属性就是val
		}
	}
	else//下面是获取计算后样式的方法(即传入参数是两个的时候)	
    {
		var iVal=obj.currentStyle?parseFloat(obj.currentStyle[attr]):parseFloat(getComputedStyle(obj)[attr]);
		if(attr=="opacity")//此时再次判断对象的属性是不是opacity
		{
			iVal*=100;   //iVal = iVal * 100;(默认的iVal值是个小数)所以获取的是iVal*100
		}
		return iVal;//把iVval值返回
	}
}
//获取元素
function $(selector,content){
    content = content || document;
    var tag = selector.charAt(),
        arr = [],
        allClassEle = null;
    if( tag === "#" ){
        selector = selector.substring(1);
        return content.getElementById(selector);
    }else if( tag === "." ){
        selector = selector.substring(1);	
        allClassEle = content.getElementsByTagName("*");	// [div,ul,li]

        for( var i = 0; i < allClassEle.length; i++ ){
            if( selector === allClassEle[i].className ){
                arr.push(allClassEle[i]);
            }
        };

        return arr;
    }else{
        return content.getElementsByTagName(selector);
    }
};

//抖函数
function fnShake(obj,attr,n,callBack)
{
	if(obj.oTimer1)//如果对象有定时器 (这个if是不能丢的 如果没有定时器就会乱掉)
	{
		return;
	}
	var arr=[];
	var iNow=css(obj,attr);//获取对象的属性并把值赋给iNow
	for(var i=n;i>=0;i-=2) // i -= 2; i = i - 2;
	{
		arr.push(iNow+i,iNow-i+1);        //80 21; 78 23(每次可以push多个值)
	}
	arr.push(iNow);//最后把iNow push进去是因为前面push到最后是51;所以最后push 50
	i=0;//这里的i没有定义是因为上面的i已经定义过了,在此重新赋值为零    
	clearInterval(obj.oTimer1);
	obj.oTimer1=setInterval(function()
	{
		if(i>arr.length-1)//如果i大于arr的length-1
		{
			clearInterval(obj.oTimer1);//关闭当前的定时器
			obj.oTimer1=0;
			callBack && callBack();//如果有callBack 并且 callBack()
		}
		else//否则
		{
			css(obj,attr,arr[i]);
			i++;//让i++
		}
	},30);
}

//子节点兼容
function last( obj ){
    if( !obj || !obj.lastChild ) return null;
    return obj.lastChild.nodeType === 1 ? obj.lastChild : prev(  obj.lastChild );
}

function first( obj ){
    if( !obj || !obj.firstChild ) return null;
    return obj.firstChild.nodeType === 1 ? obj.firstChild : next(  obj.firstChild );
}

function prev( obj ){
    if( !obj || !obj.previousSibling ) return null;
    return obj.previousSibling.nodeType === 1 ? obj.previousSibling : prev(  obj.previousSibling );
}

function next( obj ){
    if( !obj || !obj.nextSibling ) return null;

    return obj.nextSibling.nodeType === 1 ? obj.nextSibling : next(  obj.nextSibling );

}
//事件绑定兼容写法
function bind( obj , evName , evFn ){
    if( obj.addEventListener ){   //标准下
        obj.addEventListener( evName , evFn , false  );
    }else{    // ie低版本使用
        obj.attachEvent( 'on' +evName , function(){
                 evFn .call( obj );   //改变一下传入的事件处理函数的this指向
        } )
    }
}