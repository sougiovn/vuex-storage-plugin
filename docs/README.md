---
home: false
sidebarDepth: 3
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
|storage|Objeto que segue a interface [Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage)* como localStorage ou sessionStorage|API usada para armazenar o estado da aplicação|
|removeIfNull|Boolean, default `true`|Indica se o plugin deve remover o valor do storage ou salvar `null|
|populate|Array de Strings e/ou objetos|Indica os módulos/atributos/mutations que devem ser armazenados|
|afterPopulate|Function**|Hook chamado logo após o estado root ou do módulo ser carregado na store|

&ast;
```ts
{
  getItem(String): String
  setItem(String, String)
  removeItem(String)
} 
```
&ast;&ast;
```ts
function(rootStore); // static or unnamed modules
function(moduleStore, rootStore); // dynamic and named module
```