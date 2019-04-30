---
home: false
sidebarDepth: 2
sidebar: auto
title: Documentação
---

## Que é Vuex Storage Plugin e por quê?

### O que é?
Vuex Storage Plugin é um plugin para Vuex para persistir dados de sua store no localStorage, 
sessionStorage e etc. Ele oferece a configuração convencional na criação do `Vuex.Store` para o rootState 
e módulos estáticos, mas também oferece configuração para módulos dinâmicos.

### Por que?
Quando precisei armazenar alguns dados da minha store no
sessionStorage não encontrei nenhum plugin simples de usar, fácil de aprender e que se 
encaixa-se à minha aplicação sem grandes alterações.
Precisava que o plugin armazena-se apenas alguns atributos de módulos  
dinâmicos e não encontrei nada do tipo ou pelo menos a documentação não me ajudou muito.

## Instalação

```
npm install --save vuex-storage-plugin
```

## Configuração


<<<@/docs/.vuepress/plugin-instalation.js

|Atributo|Tipo|Descrição|
|---|---|---|
|prefix|String, default `'vuex'`|Prefixo usado na chave do storage, exemplo: `"vuex/myAttr"`|
|[storage](#storage)|[Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage)|API usada para persistir o estado da aplicação|
|removeIfNull|Boolean, default `true`|Indica se o plugin deve remover o valor do storage ou salvar `null`|
|[populate](#populate)|Array de String e/ou [Object](#populate-object)|Indica os módulos, atributos e mutations que devem ser persistidos|
|[afterPopulate](#after-populate)|Function|Hook chamado logo após o estado root ou do módulo ser carregado na store|

## storage

Seguindo a interface de [Web Storage API](), como localStorage ou sessionStorage.   
Os métodos necessários para o plugin são os seguintes:

<<<@/docs/.vuepress/storage-interface.ts

::: tip Dica
Caso queira criar seu Storage personalizado ou fazer um wrapper para uma lib como [js-cookie](https://www.npmjs.com/package/js-cookie) você só precisa implementar os métodos acima, exemplo:

<<<@/docs/.vuepress/js-cookie-wrapper-example.js
:::

## populate

O atributo populate é onde você indicará quais os atributos devem ser persistidos no storage e 
populados do storage na criação do `Vuex.Store` ou no registro de um módulo dinâmico.

Há duas maneiras de se configurar este atributo:
1. Usando Strings que representam o nome dos atributos e das mutations usadas para atualizar seus valores
2. Usando Objetos complexos

### Usando Strings

Quando usando String entendesse que foi usado o mesmo nome do atributo à 
mutation responsável por sua atualização.

Usando estado estático:

<<<@/docs/.vuepress/static-string-populate.js{9}

Usando módulo dinâmico:

<<<@/docs/.vuepress/dynamic-string-populate.js{29,47}

::: warning Atenção
Configuração como String funciona apenas para o state raíz da store e módulos dinâmicos.   
Para módulos estáticos é necessário configuração do nome do módulo junto aos nomes 
do atributo e mutation.
:::

### Usando Objetos

Usando Objetos permite que você use atributos e mutations com nomes diferentes, 
o nome do módulo sendo configurado e também permite que você defina um valor `default` 
para o atributo quando o plugin não encontrar o valor do atributo no storage.

#### Interface do objeto esperado

<<<@/docs/.vuepress/populate-item-interface.ts

|Atributo|Descrição|
|---|---|
|module|Nome do módulo da configuração. Não importa se é nomeado ou não, se não for dinâmico tem de colocar o módulo|
|attr|Nome do atributo que deseja persistir no storage|
|mutation|Nome do mutation a ser observado para persistir na store*|
|default|Valor a ser atribuído quando não existe valor no storage, o valor `default` é `null`|

::: warning Atenção
É persistido no storage o valor passado como parâmetro para a mutation. 
Caso o valor seja "processado" dentro da mutation, isso não é visível para o plugin. 

<<<@/docs/.vuepress/mutation-example.js{22,28}

O valor persistido será `"love"`, não `"bacon is love"`
:::

## afterPopulate

Caso você deseje realizar alguma lógica após receber os dados do storage, 
o `afterPopulate` tem a proposta de ser um `hook` chamado após os dados serem restaurados do storage e 
inseridos no store.

Existem duas assinaturas de método para esse `hook`:
1. Estático raíz e módulos dinâmicos não nomeados, executado após criação da store raíz
2. Módulo dinâmico e nomeado, executado ao registrar um novo módulo

<<<@/docs/.vuepress/after-populate-type.ts
