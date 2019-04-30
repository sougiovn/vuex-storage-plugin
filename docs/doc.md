---
home: false
sidebarDepth: 2
sidebar: auto
title: Documentação
---

## What is Vuex Storage Plugin and why?

### What is it?

Vuex Storage Plugin is a Vuex's plugin for persisting data from store 
into localStorage, sessionStorage and etc. It offers the conventional configuration in `Vuex.Store`'s creation 
for rootState and static modules, but also offers configuration in dynamic modules. 

### Why?

When I needed to persist some data from my store into sessionStorage
I didn't find a simple to use or learn plugin which fit in my app without lots of changes.

I needed a plugin which would persisted only a few attributes from my dynamic modules, and didn't find 
none of the kind or at least the documentation didn't help a lot.

## Instalation

```
npm install --save vuex-storage-plugin
```

## Configuration

<<<@/docs/.vuepress/plugin-instalation.js

|Attribute|Type|Description|
|---|---|---|
|prefix|String, default `'vuex'`|Prefix used in storage's key, example: `"vuex/myAttr"`|
|[storage](#storage)|[Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage)|API used to persist the app's state|
|removeIfNull|Boolean, default `true`|Indicates if the plugin should remove the item from the storage or persist `null` value|
|[populate](#populate)|Array de String e/ou [Object](#populate-object)|Indicates the modules, attributes and mutations which have to be persisted|
|[afterPopulate](#after-populate)|Function|Hook invoked right after the rootState or module's state have been loaded from storage into the store|

## storage

Following the [Web Storage API]() interface, as localStorage or sessionStorage.   
The needed methods for the plugin is:

<<<@/docs/.vuepress/storage-interface.ts

::: tip Tip
In the case you want to create your custom storage or a wrapper for a lib as 
[js-cookie](https://www.npmjs.com/package/js-cookie) you just need to implement the methods above, example: 

<<<@/docs/.vuepress/js-cookie-wrapper-example.js
:::

## populate

The populate attribute is where you indicate which attributes from your store/module have to be 
persisted into the storage and populated from the storage while the `Vuex.Store`'s creation or a dynamic module registration

There are two ways to configure this attribute:
1. Using Strings which represents the names of your attributes and mutations used to update it's values
2. Using complex Objects

### Using Strings

When using String it's perceived that the mutation's name which updates the attribute 
has the same as the attribute

Using static state:

<<<@/docs/.vuepress/static-string-populate.js{9}

Using dynamic module:

<<<@/docs/.vuepress/dynamic-string-populate.js{29,47}

::: warning Warning
String configuration only works for the rootState and dynamic modules.  
For static modules is needed the module's name along with the attribute's and mutation's name
:::

### Using Objects

Using Objects you may use a different name to the attributes and mutations, 
you have to define the module's name you'r configuring and also you may define a `default` value 
for the attribute when the plugin doesn't find it's value in the storage.

#### Interface do objeto esperado

<<<@/docs/.vuepress/populate-item-interface.ts

|Attribute|Description|
|---|---|
|module|Module configuration's name. Doesn't matter if it's namespaced or not, if it's not dynamic it has to be provided|
|attr|Attribute's name you want to persist|
|mutation|Mutation's name to be observed*|
|default|Value given for the attribute if it doesn't exist in the storage, the `default` is `null`|

::: warning Warning
The value persisted in the storage is the parameter passed into the mutation's funciton.
If the value is "processed" inside the mutation, it's not visible to the plugin.  

<<<@/docs/.vuepress/mutation-example.js{22,28}

The value persisted will be `"love"`, not `"bacon is love"`
:::

## afterPopulate

If you want to do some logic after receiving the data from the storage, 
the `afterPopulate`'is a `hook` invoked after the data from the storage 
has been populated into the store.

It has two signatures:
1. For rootState, executed after the `Vuex.Store`'s creation and dynamic unnamed modules, executed after it's registration 
2. Dynamic and named modules, executed after it's registration

<<<@/docs/.vuepress/after-populate-type.ts
