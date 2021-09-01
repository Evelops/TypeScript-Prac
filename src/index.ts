import * as CryptoJS from "crypto-js"; 

class Block { 
    static calculateBlockHash = ( //CryptoJS를 사용하여 하나의 block이 가지고 있는 값을 hash 값으로 계산해주는 역할을 담당. static을 사용하여 클래스밖에서도 자유롭게 사용할 수 있도록 구성. 타입은 string.
        index:number,
        previousHash:string, 
        timestamp:number, 
        data:string
        ) : string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

// 블록의 구조가 일치하는지 판단하는 함수.
    static validateStructure = (aBlock:Block):boolean =>  
      typeof aBlock.index === "number" &&
      typeof aBlock.hash === "string" &&
      typeof aBlock.previousHash === "string" &&
      typeof aBlock.timestamp === "number" && 
      typeof aBlock.data === "string" ;    

      //Block이 가지는 인자들 

      public index:number;
      public hash:string;
      public previousHash: string;
      public data: string;
      public timestamp: number;

      //Block의 생성자 
    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number)
    {
        this.index = index;
        this.hash = hash;
        this.previousHash=previousHash;
        this.data=data;
        this.timestamp=timestamp;
    }
}

// blockchain의 시작 block인 genesisBlock 객체를 하나 생성함. 
const genesisBlock:Block = new Block(0,"20202020200202020","","Hello",123456);

// 각 block을 생성시 연결해줄 blockchain 배열을 생성. block을 추가할 때 마다 값이 바뀜으로 let 사용하고, 최초의 genesisBlock을 blockchain block에 넣어둠. 
let blockchain:Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;
// 현재 생성된 blockchain의 길이가 얼마인지 알려주는 함수
const getLatestBlock = () : Block => blockchain[blockchain.length-1];
//block이 생성될때의 시간을 찍어주는 함수.
const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000 );
//블럭 생성함수.
const createNewBlock = (data:string) : Block => { 
    const previousBlock : Block =getLatestBlock();
    const newIndex : number = previousBlock.index + 1; // 이전 block 의 index 값을 확인하고 그 값에 +1을 해준다.
    const newTimestamp : number =getNewTimeStamp(); // block이 최초의 생성될때 시간을 알려주는 getNewTimeStamp함수를 호출.
    const newHash:string = Block.calculateBlockHash( // 생성될 블럭의 hash 값을 계산해줄 Block의 calculateBlockHash를 호출하여 , 새로 생성될 블럭의 해쉬값을 구해서 저장.
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data)
        ;
        const newBlock : Block = new Block( // 위의 값들을 기반으로 새로운 Block 객체를 생성.
            newIndex, 
            newHash, 
            previousBlock.hash, 
            data, 
            newTimestamp
            );
            addBlock(newBlock); // 밑의 addBlock 함수를 만족하면 newBlock객체를 생성하고 blockchain에 push함 밑의 add 함수 참고.
            return newBlock; // 새로운 block을 리턴해줌. 
};

//Block의 해쉬를 가져오는 함수. 
const getHashforBlock = (aBlock : Block) :string => Block.calculateBlockHash( 
    aBlock.index, 
    aBlock.previousHash, 
    aBlock.timestamp, 
    aBlock.data 
    );
   
    //  Block들간의 link를 표현하고 제공되는 블럭이 유효한가를 평가하는 함수 .
const isBlockValid = (
    candidateBlock:Block,
    previousBlock : Block
) : boolean => {
    if(!Block.validateStructure(candidateBlock)){  // Block 구조 판단. 
        return false;
    }
    else if(previousBlock.index + 1 !== candidateBlock.index){ // Block index 판단. 
        return false;
    }
    else if(previousBlock.hash !== candidateBlock.previousHash){ //Block 의 hash 판단. 
        return false;
    }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){ // 현재 블럭의 해쉬값과 getHashforBlock에서 받아온 hash가 일치하는지 판다.ㄴ 
        return false;
    }else{
        return true;
    }
}

// 처음 block을 생성할 때 유효성 검사를 하고, 조건에 일치하면, blockchain에 push 하는 함수. 
const addBlock = (candidateBlock: Block) : void  => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};