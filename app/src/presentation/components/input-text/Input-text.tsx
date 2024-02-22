import React from 'react';
import { Input, Label } from './Input-text.styles';



const InputText: React.FC = () => {
  return (
    <Label
    >
      Tarefa
      <Input
        placeholder='Adicione a tarefa'
      />
    </Label>
  )
}

export default InputText
