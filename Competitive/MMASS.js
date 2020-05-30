//https://www.spoj.com/problems/MMASS/

function main(){

    let input_array = program_input.split('\n');
    let T = Number(input_array[0]);
    let atomMass = {H:1, C:12, O:16};

    for(let i=1; i<=T; i++){

        let moleculeFormula = input_array[i];
        let stack = [];
        
        for(let j=0; j<moleculeFormula.length; j++){

            if(moleculeFormula[j]=='('){

                stack.push(moleculeFormula[j]);
            }else if(atomMass.hasOwnProperty(moleculeFormula[j])){

                stack.push(atomMass[moleculeFormula[j]]);
            }else if(moleculeFormula[j] == ')'){

                let stackVal = stack.pop();
                let groupMass = 0;
                while(stackVal!='('){

                    groupMass += stackVal;
                    stackVal = stack.pop();
                }

                stack.push(groupMass);
            }else{

                stack.push(stack.pop() * Number(moleculeFormula[j]));
            }

            // console.log(stack);
        }

        let moleculeMass = 0;
        while(stack.length){

            moleculeMass += stack.pop();
        }

        console.log(moleculeFormula, '=>', moleculeMass);
    }
}

let program_input = `3
COOH
CH(CO2H)3
((CH)2(OH2H)(C(H))O)3`;
main();