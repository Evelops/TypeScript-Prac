/*const name = "SeungYeol",
      age = 25,
      gender = "male";
  */  

const SayHi=(name:string,age:number,gender:string): string=>{
    return `Hello ${name}, you are ${age}, you are a ${gender}`;
};

console.log(SayHi("SeungYeol",25,"male"));
//SayHi(name,age) =>는 오류남. TypeScript는 확실한 언어, js랑 다르게 사용하고자 선언한 변수들을 다 사용해야된다. 하지만 해당 요소에 ? 를 붙이면 사용할 수 도 사용하지 않을 수도 있다는 의미로 통함 => 매우 강려크!! 

export {};