function main(){

    let input_array = program_input.split('\n');
    let T = Number(input_array[0]);
    for(let i=1; i<=T; i++){
        
        // console.debug("\n\n");
        let infix = input_array[i];
        let prefix = '';
        let postfix = '';

        let operandStack = [];
        let operatorStack = [];
        for(let j=0; j<infix.length; j++){
            //char code 97-122 => [a-z], 40-43 => [()*+], - 45, / 47, ^ 94
            let char = infix[j];
            let charCode = infix.charCodeAt(j);
            if(charCode>=97 && charCode<=122){ //check for all operand

                operandStack.push(char);
            }else { //handle operator

                if(operatorStack.length==0){ //if operator stack empty simply push

                    operatorStack.push(char);
                }else{

                    while(operatorStack.length){

                        let lastOperator = operatorStack[operatorStack.length-1];
                        // console.debug("Operators ", lastOperator, char);
                        if (getPrecedency(lastOperator)<getPrecedency(char)){

                            // console.debug("Low high precedency", getPrecedency(lastOperator), getPrecedency(char));
                            break;
                        }

                        if(lastOperator.charCodeAt(0)==40) {

                            // console.debug("Last operator is (");
                            break;
                        }

                        if(operandStack.length<2){

                            console.error("Invalid expression: Less number of operands");
                            break;
                        }

                        let operand1 = operandStack.pop();
                        let operand2 = operandStack.pop();
                        operandStack.push(operatorStack.pop()+operand1+operand2);

                        // console.debug(operandStack, operatorStack, infix, prefix, postfix);
                    }

                    if(char.charCodeAt(0)==41){

                        if(operatorStack.length==0 || operatorStack[operatorStack.length-1].charCodeAt(0)!=40){

                            console.error("Invalid expression: Opening and closing paranthesis mismatch");
                            break;
                        }else{

                            operatorStack.pop();
                        }
                    }else{

                        operatorStack.push(char);
                    }
                }
            }

            // console.debug(operandStack, operatorStack, infix, prefix, postfix);
        }

        while(operatorStack.length){

            if(operandStack.length<2){

                console.error("Invalid expression: operator and operand mismatch");
                break;
            }

            let operand1 = operandStack.pop();
            let operand2 = operandStack.pop();
            let operator = operatorStack.pop();
            operandStack.push(operator+operand1+operand2);
        }

        if(operandStack.length!=1){

            console.error("Invalid expression: Error in parsing");
            break;
        }

        prefix = operandStack.pop();
        postfix = prefix.split('').reverse().join('');
        console.info(operandStack, operatorStack, infix, prefix, postfix);
    }
}

function getPrecedency(operator){

    switch(operator.charCodeAt(0)){

        case 40: // (
            return 5;
        case 94: // ^
            return 4;
        case 42: // *
        case 47: // /
            return 3;
        case 43: // +
        case 45: // -
            return 2;  
        case 41: // )
            return 1;
    }
}

let program_input = `10
(a+(b*c))
((a+b)*(z+x))
((a+t)*((b+(a+c))^(c+d)))
a+b
a+b+c
a*b+c
a+b*c
(a+b*c)^(d+e)
(a*b+c)^(d+e)
a*b-c^d*e/f+g*h`;
main();