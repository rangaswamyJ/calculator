import { Component } from '@angular/core';

interface Memory{
  res:string;
  sRes:string;
  subRes:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  result='0';
  subResult:string='0';
  isStart:boolean=true;
  opCount = 0;//this will hold the operator count
  
  isError=false;
  err = false;

  defaultInfo:Array<Memory> = [
                {res:'equation ',sRes:'result',subRes:'previous result'},
                {res:'Ran ',sRes:'CSE Student',subRes:'Developed By'}];
  memory:Array<Memory> = this.defaultInfo;
  
  isMemoryTab = false;
  ///this fn's listen for History btn click in ui
  onMemoryShowClicked(){
    this.isMemoryTab = this.isMemoryTab? false:true;
    //console.log(this.isMemoryTab);
    
  }

  onInput(temp:string){
    //this.isStart = (this.result.charAt(this.result.length-1) === '0')? true:false;

    //console.log(this.opCount);
    
    if (this.isStart) {
      this.result = temp.toString();
      this.isStart = false;
      if (this.isOperation(temp)) {
        this.opCount++;
      }
      
    }
    else if(this.isOperation(temp)){
      this.opCount++;
   // console.log(this.opCount);
      
      if (this.opCount >= 2) {
        this.result = this.result.slice(0,-1);
        this.result += temp;
        this.opCount = 1;
      }
      else{
        this.result += temp;

      }
    }
     else {
      this.result += temp;
      this.opCount=0;

    }
    //console.log(this.result);
  }
  onClear(){
    this.result=' ';
    //this.subResult = '0';
    this.isStart = true;
    this.opCount = 0;
    this.isError = false;

  }
  onBack(){

    this.result = this.result.slice(0,-1);

    
  }
  evaluate(){
    try {
    this.memoryAdd();
      
      this.result = eval(this.result);
      this.result = this.result.toString();
      this.subResult = this.result;
    } catch (e) {
      //console.log("erro");
      this.isError=true;
      this.err=e;

    }
  }
  
  isOperation(op){
   //let op = this.result.charAt(this.result.length-1);
    switch (op) {
      case '/':
      case '*':
      case '+':
      case '-':
      case '%':return true;
        
        
    
      default: return false;
        
    }
  }
  



  memoryAdd(){
    let data:Memory = {res:this.result,sRes:eval(this.result),subRes:this.subResult};
    this.memory.unshift(data);
    //add element at starting of the array
  }

  memoryFill(index){
    let data = this.memory[index]
    this.result = data.res;
    this.subResult = data.subRes;
    this.isMemoryTab=false;
    
  }

  memoryClear(){
    this.memory = [
      {res:'equation ',sRes:'result',subRes:'previous result'},
      {res:'Ran ',sRes:'CSE Student',subRes:'Developed By'}];;
  }

}
