// https://www.spoj.com/problems/STPAR/

function main(){

    let input_array = program_input.split('\n');
    
    let line_num = 0;
    let T = Number(input_array[line_num++]);
    for(let i=0; i<T; i++){

        let N = Number(input_array[line_num++]);
        
        let sStack = input_array[line_num++].split(' ').map(Number).reverse(); //source stack
        let dStack = []; //destination stack
        let tStack = []; //temp stack

        // console.log(sStack);
        while(sStack.length){

            let dTop = dStack.length>0 ? dStack[dStack.length-1] : 0;
            let sTop = sStack[sStack.length-1];   
            if(dTop+1 == sTop){

                dStack.push(sStack.pop());
            }else if(tStack.length == 0){

                tStack.push(sStack.pop());
            }else if(tStack.length>0){

                while(tStack.length){

                    let tTop = tStack[tStack.length-1];
                    let dTop = dStack.length>0 ? dStack[dStack.length-1] : 0;
                    if(dTop+1 == tTop){

                        dStack.push(tStack.pop());
                    }else{

                        break;
                    }
                }

                tStack.push(sStack.pop());
            }
        }

        while(tStack.length){
            // console.log(sStack, tStack, dStack);
            let tTop = tStack[tStack.length-1];
            let dTop = dStack.length>0 ? dStack[dStack.length-1] : 0;
            if(dTop+1 == tTop){

                dStack.push(tStack.pop());
            }else{

                break;
            }
        }

        // console.log(sStack, tStack, dStack, dStack.length==N ? 'YES' : 'NO');
        console.log(dStack.length==N ? 'YES' : 'NO');

        /**
        while(sStack.length || tStack.length){
            while(sStack.length){

                let sTop = sStack[sStack.length-1];
                let dTop = dStack.length>0 ? dStack[dStack.length-1] : 0;
                if(dTop+1 == sTop){
                    console.log(`Copy ${sTop} from S to D`);
                    dStack.push(sStack.pop());
                }else{
                    if(sStack.length==1){
                        console.log(`Skipping movement of ${sTop} from S`);
                        break;
                    }else{
                        console.log(`Copy ${sTop} from S to T`);
                        tStack.push(sStack.pop());
                    }
                }
            }

            while(tStack.length){

                let tTop = tStack[tStack.length-1];
                let dTop = dStack.length>0 ? dStack[dStack.length-1] : 0;
                if(dTop+1 == tTop){
                    console.log(`Copy ${tTop} from T to D`);
                    dStack.push(tStack.pop());
                }else{
                    if(tStack.length==1){
                        console.log(`Skipping movement of ${tTop} from T`);
                        break;
                    }else{
                        console.log(`Copy ${tTop} from T to S`);
                        sStack.push(tStack.pop());
                    }
                }
            }
        }*/
    }
}

// let program_input = `6
// 5
// 5 1 2 4 3
// 5
// 3 5 2 1 4
// 5
// 2 5 3 1 4
// 5
// 4 1 5 3 2
// 10
// 1 2 10 5 4 3 9 8 7 6
// 10
// 1 2 10 5 4 3 7 6 8 9`;
let program_input = `8
5
4 1 5 3 2
5
3 1 2 5 4
5
5 3 2 1 4
10
1 2 10 5 4 3 7 6 8 9
10
1 2 10 5 4 3 9 8 7 6
5
3 5 2 4 1
5
1 2 4 3 5
4
4 2 3 1`
main();