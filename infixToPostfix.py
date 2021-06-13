def priority(op):
    if op == '^':
        return 3
    elif op == '*' or op == '/':
        return 2
    elif op == '+' or op == '-':
        return 1

def infixToPostfix(infix):
    exp = []
    ops = []
    for ch in infix:
        if (ord(ch) >= 65 and ord(ch) <= 90) or (ord(ch) >= 97 and ord(ch) <= 122) or ch == '(':
            exp.append(ch)
        elif ch == ')':
            ch1 = exp.pop()
            ch2 = exp.pop()
            while ch2 != '(':
                op = ops.pop()
                exp.append(ch2+ch1+op)
                ch1 = exp.pop()
                ch2 = exp.pop()
            exp.append(ch1)
        else:
            if len(ops) == 0:
                ops.append(ch)
            elif priority(ch) > priority(ops[len(ops)-1]):
                ops.append(ch)
            else:
                while len(ops) > 0 and exp[len(exp)-2] != '(' and priority(ops[len(ops)-1]) >= priority(ch):
                    ch1 = exp.pop()
                    ch2 = exp.pop()
                    op = ops.pop()
                    exp.append(ch2+ch1+op)
                ops.append(ch)

    while len(ops):
        ch1 = exp.pop()
        ch2 = exp.pop()
        op = ops.pop()
        exp.append(ch2+ch1+op)

    return exp.pop()

testCases = [
    "a+b",
    "a+b+c",
    "a+b*c",
    "a*b+c",
    "a*(b+c)",
    "a+(b*c+(d-e))",
    "a+b*(c^d-e)^(f+g*h)-i",
    "A*(B+C)/D"
]

for case in testCases:
    print(case, "=>", infixToPostfix(case))