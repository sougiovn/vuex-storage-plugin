---
home: false
sidebarDepth: 2
sidebar: auto
---

# Vuex Storage Plugin

Plugin de Storage para Vuex, simples e de fácil usar

## Por que o Vuex Storage Plugin?

Quando precisei de um plugin para armazenar os estados da minha aplicação em sessionStorage não encontrei um plugin simples de usar, fácil de aprender e que se encaixa-se à minha aplicação sem grandes alterações nela.
Precisava que o plugin armazena-se apenas alguns atributos de estados nomeados de módulos dinâmicos e não encontrei nada do tipo ou pelo menos a documentação não me ajudou muito.

## Instalação

```
npm install --save vuex-storage-plugin
```

## Configuração

<<<@/docs/.vuepress/components/plugin-instalation.js

|Atributo|Tipo|Descrição|
|---|---|---|
|prefix|String, default `'vuex'`|Prefixo usado na chave do storage|
|[storage](#storage)|Objeto que segue a interface [Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage) como localStorage ou sessionStorage|API usada para armazenar o estado da aplicação|
|removeIfNull|Boolean, default `true`|Indica se o plugin deve remover o valor do storage ou salvar `null|
|[populate](#populate)|Array de String e/ou [Object](#populate-object)|Indica os módulos/atributos/mutations que devem ser armazenados|
|[afterPopulate](#after-populate)|Function***|Hook chamado logo após o estado root ou do módulo ser carregado na store|

## storage

Seguindo a interface de [Web Storage API](), os métodos necessários para o plugin são os seguintes.

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
Configuração como String funciona apenas para o state raíz da store e módulos dinâmicos, pois para usar em módulos é necessária configuração do nome do módulo junto aos nomes do atributo e mutation
:::

### Usando Objetos

```ts
{
  module: string,
  attr: string,
  mutation: string,
  default: any,
  reduce: function(value: string): string
}
```

&ast;&ast;&ast;
```ts
function(rootStore); // static or unnamed modules
function(moduleStore, rootStore); // dynamic and named modules
```
## afterPopulate