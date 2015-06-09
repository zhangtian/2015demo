
window.onload = function(){
    //获取box
    var oBox = getClass("box")[0];

    //获取头部
    var oHeader = getClass("header")[0];
    var oToolBar = getClass("toolBar",oHeader)[0];
    var bOff = true;

    //获取底部
    var oFooter = getClass("footer")[0];
    var oFooterList = getClass("footer_list",oFooter)[0];
    var aFooterListLi = oFooterList.getElementsByTagName("li");
    var oEditor = getClass("editor",oFooter)[0];
    var oPageBten = getClass("pageBten",oFooter)[0];
    var aApageBten = oPageBten.getElementsByTagName("a");

    //获取提示框
    var oTips = getClass("tips")[0];
    var oTipsConClose = getClass("tipsCon_close",oTips)[0];

    //获取中间
    var oCont = getClass("cont")[0];
    var oContCenter = getClass("contCenter")[0];

    //设置oBox宽高
    oBox.style.height = view().h+'px';
    oBox.style.width = view().w+'px';

    //设置oContCenter和oCont的高度
    var h = view().h - oHeader.offsetHeight - oFooter.offsetHeight;
    oCont.style.height = h + 'px';
    //加载完成后第一个页数添加active
    aFooterListLi[0].className = 'active';
    //点击关闭按钮提示框关闭
    oTipsConClose.onclick = function(){
        oTips.className = 'tips hide';
        bOff = false;
    }

    //使用artTemplate.js模板加载数据
    var cont_box = document.getElementById("cont_box");
    var temp_html = template("contentList", { arr: arr });
    cont_box.innerHTML = cont_box.innerHTML + temp_html;

    var aCcont = getClass("cCont_item",oCont);
    for(var i = 0; i < aCcont.length; i++){
        aCcont[i].style.height = h + 'px';
        aCcont[i].style.width = view().w + 'px';
    }
    //页数添加
    var str = '';
    for(var i = 0; i < aCcont.length; i++){
        str += '<li>'+(i+1)+'<i></i></li>';
    }
    oFooterList.innerHTML = str;
    aFooterListLi[0].className = 'active';

    var iNum = 0;
    //滚轮事件的调用
    wheel(document,function(){
        commonL();
    },function(){
        commonR();
    });

    //滚轮事件的封装
    function wheel(obj,callback1,callback2){
            obj.onmousewheel = fn;
        if( obj.addEventListener ){
            obj.addEventListener( "DOMMouseScroll",fn,false );
        }
        function fn(ev){
            var e = ev||event;
            var flag = true;
            for(var i = 0; i < aFooterListLi.length;i++){
                aFooterListLi[i].className = '';
            }
            if(e.wheelDelta){
                flag = e.wheelDelta > 0 ? true : false;
            }else{
                flag = e.detail < 0 ? true : false;
            }

            if( flag ){
                callback1 && callback1();
                
            }else{
                callback2 && callback2();
            }

            //阻止默认事件
            if( e.preventDefault ){
                 e.preventDefault();
            }
            return false;
        }
    }

    //页数点击
    var len = aFooterListLi.length;
    for(var i = 0; i < len;i++){
        aFooterListLi[i].index = i;
        aFooterListLi[i].onclick = function(){
            iNum =-this.index;
            tab();

            
        };
    };
    //点击上一页 下一页
    aApageBten[0].onclick = function(){
        commonL();
    };

    aApageBten[1].onclick = function(){
        
        commonR();
        
    }
    //公共的循环添加active
    function tab(){
        for(var k = 0; k < len;k++){
            aFooterListLi[k].className = '';
        }
        aFooterListLi[-iNum].className = 'active';
        oCont.style.left = iNum*view().w + 'px';
    };

    //向左
    function commonL(){
        oEditor.className = 'editor';
        oTips.className = 'tips hide';
        oToolBar.className = 'toolBar';
        iNum++;
        if(iNum >= 0){
            iNum = 0;
            oEditor.className = 'editor hide';
            //判断关闭按钮是否关闭 如果关闭了再次回到第一页也是关闭的（隐藏） 否则就是显示的
            if(bOff){
                oTips.className = 'tips';
            }else{
                oTips.className = 'tips hide';
            }
            oToolBar.className = 'toolBar hide';
        };
        oCont.style.left = oCont.offsetLeft + view().w + 'px';
        tab();
    };

    //向右
    function commonR(){
        iNum--;

        if(iNum <= -(len-1)){
            iNum = -(len-1);
            
        };
        oCont.style.left = oCont.offsetLeft - view().w + 'px';
        tab();
        oEditor.className = 'editor';
        oTips.className = 'tips hide';
        oToolBar.className = 'toolBar';
    };
}











