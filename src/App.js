import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row, Colum } from "./styles";
import { useState } from 'react';

const App = () => {

  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  // Limpar tudo
  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  };

  // Digitar números
  const handleAddNumber = (num) => {
    setCurrentNumber(prev => (prev === '0' ? num : prev + num));
  };

  // Função que faz o cálculo
  const calculate = (op, a, b) => {
    const first = Number(a);
    const second = Number(b);

    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        if (second === 0) return null; // evita Infinity
        return first / second;
      case '%':
        return (first * second) / 100;
      default:
        return null;
    }
  };

  // Clique em + - * / %
  const handleOperation = (op) => {

    // Primeira operação
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation(op);
      return;
    }

    // Já existe operação → faz cálculo e continua sequência
    if (operation !== '' && currentNumber !== '0') {
      const result = calculate(operation, firstNumber, currentNumber);

      if (result === null) {
        handleOnClear();
        return;
      }

      setFirstNumber(String(result));
      setCurrentNumber('0');
      setOperation(op);
      return;
    }

    // Só troca operação
    setOperation(op);
  };

  // Clique em =
  const handleEquals = () => {

    if (firstNumber === '0' || operation === '') return;

    const result = calculate(operation, firstNumber, currentNumber);

    if (result === null) {
      handleOnClear();
      return;
    }

    setCurrentNumber(String(result));
    setFirstNumber('0');
    setOperation('');
  };

  return (
    <Container>
      <Content>

        <Input value={currentNumber} />

        <Row>
          <Button label="C" onClick={handleOnClear} />
          <Button label="/" onClick={() => handleOperation('/')} />
          <Button label="*" onClick={() => handleOperation('*')} />
          <Button label="-" onClick={() => handleOperation('-')} />
        </Row>

        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="+" onClick={() => handleOperation('+')} />
        </Row>

        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="%" onClick={() => handleOperation('%')} />
        </Row>

        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={handleEquals} />
        </Row>

        <Colum>
          <Button label="0" onClick={() => handleAddNumber('0')} />
        </Colum>

      </Content>
    </Container>
  );
};

export default App;
