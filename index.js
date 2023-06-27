const calculator=document.querySelector('.calculator');
const screen=document.querySelector('.screen');

calculator.addEventListener('click',(e)=>{
	//console.log(e.target.innerText) if we click the button 1, it will be printed on console.
	if(!e.target.classList.contains('button')){
		console.log("clicked")//click the buttons and see what is happening in the console.
		return;    
	}
	switch(e.target.innerText){
		case 'AC':
			screen.innerText="";//screen will be blank or cleaned if ac button is pressede as usual
			break;
		case '=':
			let result=eval(screen.innerText).toString();
			if(result.indexOf('.')!==-1){//for rounding off
				result=result.substring(0,result.indexOf('.')+4);//so upto 3rd decimal. otherwise overflow.
			}
			screen.innerText=result;
			break; 
		default:
			screen.innerText+=e.target.innerText;//they will keep appending while buttons are clicked like 1234....
	}
})
//substring concept
//"Jaspal".substring(0,4)//"Jasp"
//"Jaspal".substring(2,5)//"spa"
//"Ja.pal".substring(0,3)//"Ja."
//const result="122.11111111111111"
//result.substring(0,result.indexOf("."))//122
//result.substring(0,result.indexOf(".")+1)//122.
//const result="112234"
//result.substring(0,result.length)//112234
//result.substring(0,result.length-1)//11223