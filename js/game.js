var point = 0; //总得分
var pointbox = null; //分数div
var level = 0; //关卡
var levelbox = null; //关卡div
var blocksize = 4; //正方形阶数
var choose = Math.floor(Math.random()*blocksize*blocksize+0);
var red;
var green;
var blue;
var basecolor; //基础色
var choosecolor; //突出色
var container = null; //外层div
var innerstr = ""; //container内容
//console.log(container.offsetWidth);
//计算每个小块的长宽
var blockwidth = 0;
//初始化
function init(){
	level = 1;
	blockwidth = container.offsetWidth / blocksize - container.offsetWidth*0.02;
	basecolor = getBaseColor();
	if(basecolor){
		choosecolor = getChooseColor();
//		console.log(basecolor + "---" +choosecolor);
	}
//	console.log(Math.ceil(Math.random()*220+20));
	for (var i = 0; i < blocksize*blocksize; i++) {
		if(i==choose){
			innerstr += "<li id='"+i+"' class='block' style='width:"+ blockwidth +"px;height:"+ blockwidth +"px;background-color:#"+ choosecolor +"' onclick='next(this);'></li>";	
		}else{
			innerstr += "<li id='"+i+"' class='block' style='width:"+ blockwidth +"px;height:"+ blockwidth +"px;background-color:#"+ basecolor +"' onclick='next(this);'></li>";			
		}
	}
	container.innerHTML = innerstr;
//	console.log(innerstr);
}
//下一次随机
function next(ele){
	if(ele.id!=choose){
		point = point - 10;
		pointbox.innerHTML = point;
		deviceVibrate();
	}else{
		point += 10;
		pointbox.innerHTML = point;
		if(point / 80 > level){
			level += 1;
			if(level % 3 == 1){
				blocksize = 4;
			}else{
				blocksize += 1;				
			}
			plus.nativeUI.toast("晋级！进入第"+level+"关！",{duration:"long"});
			levelbox.innerHTML = level;
		}
	}
	innerstr = "";
	blockwidth = container.offsetWidth / blocksize - container.offsetWidth*0.02;
	choose = Math.floor(Math.random()*blocksize*blocksize+0);
	basecolor = getBaseColor();
	choosecolor = getChooseColor();
	for (var i = 0; i < blocksize*blocksize; i++) {
		if(i==choose){
			innerstr += "<li id='"+i+"' class='block' style='width:"+ blockwidth +"px;height:"+ blockwidth +"px;background-color:#"+ choosecolor +"' onclick='next(this);'></li>";	
		}else{
			innerstr += "<li id='"+i+"' class='block' style='width:"+ blockwidth +"px;height:"+ blockwidth +"px;background-color:#"+ basecolor +"' onclick='next(this);'></li>";			
		}
	}
	container.innerHTML = innerstr;
}
//震动
function deviceVibrate() {
    switch ( plus.os.name ) {
    	case "iOS":
            if ( plus.device.model.indexOf("iPhone") >= 0 ) {
                plus.device.vibrate();
            } else {
            }
    		break;
    	default:
    		plus.device.vibrate();
    		break;
    }
}
//获取突出颜色的16进制值
function getChooseColor(){
	if(level / 3 <=1){
		var redc = red + Math.floor(Math.random()*50+25);
		var greenc = green - Math.floor(Math.random()*50+25);
		var bluec = blue + Math.floor(Math.random()*50+25);
		redc = rgb2Hex(redc);
		greenc = rgb2Hex(greenc);
		bluec = rgb2Hex(bluec);
	}else if(level / 3 <=2){
		var c = Math.floor(Math.random()*2+0);
		switch (c){
			case 0:
				var redc = red + Math.floor(Math.random()*50+5);
				redc = rgb2Hex(redc);
				var greenc = green - Math.floor(Math.random()*50+5);
				greenc = rgb2Hex(greenc);
				var bluec = rgb2Hex(blue);
				break;
			case 1:
				var redc = rgb2Hex(red);
				var greenc = green - Math.floor(Math.random()*50+5);
				greenc = rgb2Hex(greenc);
				var bluec = blue + Math.floor(Math.random()*50+5);
				bluec = rgb2Hex(bluec);
				break;
			case 2:
				var redc = red + Math.floor(Math.random()*50+5);
				redc = rgb2Hex(redc);
				var greenc = rgb2Hex(green);
				var bluec = blue + Math.floor(Math.random()*50+5);
				bluec = rgb2Hex(bluec);
				break;
			default:
				break;
		}
	}else{
		var c = Math.floor(Math.random()*2+0);
		var rand = 50 - level * 2;
		if(rand<7){rand = 7};
		if(c==0){
			var redc = red + Math.floor(Math.random()*rand+5);
			redc = rgb2Hex(redc);
			var greenc = rgb2Hex(green);
			var bluec = rgb2Hex(blue);
		}else if(c==1){
			var redc = rgb2Hex(red);
			var greenc = green - Math.floor(Math.random()*rand+5);
			greenc = rgb2Hex(greenc);
			var bluec = rgb2Hex(blue);
		}else{
			var redc = rgb2Hex(red);
			var greenc = rgb2Hex(green);
			var bluec = blue + Math.floor(Math.random()*rand+5);
			bluec = rgb2Hex(bluec);
		}
	}
	return redc+greenc+bluec;
}
//获取基础色的16进制值
function getBaseColor(){
	red = Math.ceil(Math.random()*220+20);
	green = Math.ceil(Math.random()*220+20);
	blue = Math.ceil(Math.random()*220+20);
	var redn = rgb2Hex(red);
	var greenn = rgb2Hex(green);
	var bluen = rgb2Hex(blue); 
	return redn+greenn+bluen;
}
//将rgb转成16进制值
function rgb2Hex(color){
	color = (color<0)?0:color;
	color = (color>255)?255:color;
	var cz = parseInt(color/16);
	var cy = color % 16;
	cz = getJinzhi(cz);
	cy = getJinzhi(cy);
	return cz+""+cy;
}
function getJinzhi(val){
	switch (val){
		case 10:
			val = 'A';
			break;
		case 11:
			val = "B";
			break;
		case 12:
			val = "C";
			break;
		case 13:
			val = "D";
			break;
		case 14:
			val = "E";
			break;
		case 15:
			val = "F";
			break;
		default:
			val = val;
	}
	return val;
}
