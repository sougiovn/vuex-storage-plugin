---
home: false
sidebarDepth: 2
sidebar: auto
title: Documentação
---

## Que é Vuex Storage Plugin e por quê?

### O que é?
Vuex Storage Plugin é um plugin para Vuex para persistir dados de sua store no localStorage, 
sessionStorage e etc. 

### Por que?
Quando precisei armazenar alguns dados da minha store no
sessionStorage não encontrei nenhum plugin simples de usar, fácil de aprender e que se 
encaixa-se à minha aplicação sem grandes alterações nela.
Precisava que o plugin armazena-se apenas alguns atributos de módulos  
dinâmicos e não encontrei nada do tipo ou pelo menos a documentação não me ajudou muito.

## Instalação

```
npm install --save vuex-storage-plugin
```

## Configuração

<<<@/docs/.vuepress/components/plugin-instalation.js

|Atributo|Tipo|Descrição|
|---|---|---|
|prefix|String, default `'vuex'`|Prefixo usado na chave do storage|
|[storage](#storage)|[Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage)|API usada para armazenar o estado da aplicação|
|removeIfNull|Boolean, default `true`|Indica se o plugin deve remover o valor do storage ou salvar `null|
|[populate](#populate)|Array de String e/ou [Object](#populate-object)|Indica os módulos/atributos/mutations que devem ser armazenados|
|[afterPopulate](#after-populate)|Function|Hook chamado logo após o estado root ou do módulo ser carregado na store|

## storage

Seguindo a interface de [Web Storage API](), como localStorage ou sessionStorage.   
Os métodos necessários para o plugin são os seguintes:

```ts
{
  getItem(key: string): string
  setItem(key: string, value: string)
  removeItem(key: string)
} 
```
::: tip Dica
Caso queira criar seu Storage personalizado ou fazer um wrapper para uma lib como [js-cookie](https://www.npmjs.com/package/js-cookie) você só precisa implementar os métodos acima, exemplo:
```js
import Cookies from 'js-cookie';

const CookiesWrapper = {
  setItem: Cookies.set,
  getItem: Cookies.get,
  removeItem: Cookies.remove
};
```
:::

## populate

O atributo populate é onde você indicará quais os atributos devem ser persistidos no storage e populados do storage na criação da store ou módulo dinâmico.
Há duas maneiras de se configurar este atributo:
1. Usando Strings que representam o nome do atributo a ser persistido/populado e o nome da mutation que dispara a persistência do atributo
2. Usando objetos complexos

### Usando Strings

Quando passado uma string entendesse que foi dado o mesmo nome ao atributo do state à mutation responsável por sua atualização.

Usando estado estático:

<<<@/docs/.vuepress/components/static-string-populate.js{9}

Usando módulo dinâmico:

<<<@/docs/.vuepress/components/dynamic-string-populate.js{29,47}

::: warning Atenção
Configuração como String funciona apenas para o state raíz da store e módulos dinâmicos.   
Para módulos estáticos é necessário configuração do nome do módulo junto aos nomes 
do atributo e mutation.
:::

### Usando Objetos

Usando objetos você não é obrigado você não é obrigado a definir o nome da mutation igual 
ao nome do atributo, fornece o módulo a ser trabalhado além de poder definir um valor 
`default` para quando o plugin for buscar os dados no storage ao montar o state.

#### Interface do objeto esperado
```ts
{
  module: string,
  attr: string,
  mutation: string,
  default: any
}
```
|Atributo|Descrição|
|--------|---------|
|module|Nome do módulo que o atributo pertence. Não importa se é nomeado ou não, se não for dinâmico tem de colocar o módulo|
|attr|Nome do atributo que deseja persistir no storage|
|mutation|Nome do mutation a ser observado para persistir na store*|
|default|Valor a ser atribuído quando não existe valor no storage, o valor `default` é `null`|

::: warning Atenção
É persistido no storage o valor passado como parâmetro para a mutation. 
Caso o valor seja "processado" dentro da mutation, isso não é visível para o plugin. 

<<<@/docs/.vuepress/components/mutation-example.js{22,28}

O valor persistido será `"love"`, não `"bacon is love"`
:::

## afterPopulate

Caso você deseje realizar alguma lógica após receber os dados do storage, 
o `afterPopulate` tem a proposta de ser um `hook` chamado após os dados serem restaurados do storage e 
inseridos no store.

Existem duas assinaturas de método para esse `hook`:
1. Estático raíz e módulos dinâmicos não nomeados, executado após criação da store raíz
2. Módulo dinâmico e nomeado, executado ao registrar um novo módulo

```ts
function(rootStore); // static and unnamed modules
function(moduleStore, rootStore); // dynamic modules
```
