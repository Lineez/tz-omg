<template>
  <ul class="list">
    <li v-for="i of randomInteger(100, 150)" v-once class="list__item">
      <ul class="nested-list">
        <li v-for="i of randomInteger(10, 15)" v-once class="nested-list__item">
          {{ randomInteger(0, 10) }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { randomInteger } from './utils.js'

/**
 * Содержит элементы которые будут обновлены при тике
 * @type {[number]: HTMLElement}
 */
const targetsToUpdate = {};
/**
 * Список обсерверов (нужен для последующей очистки при размонтировании)
 * @type {IntersectionObserver[]}
 */
const observers = []
let intervalIdx = -1

/**
 * Добавляет/удаляет элементы из потенциально обновляемых
 * @param {[IntersectionObserverEntry]} entry
 * @param {number} i
 */
const observerCallBack = ([entry], i) => {
  if(entry.isIntersecting) {
    if(targetsToUpdate[i]) return;
    targetsToUpdate[i] = entry.target
  } else {
    delete targetsToUpdate[i]
  }
}

/**
 * Обновляет случайные элементы при тике
 * @param {number} lineIdx
 */
const updateOnTick = () => {
  for (const idx in targetsToUpdate) {
    const targetLine = targetsToUpdate[idx]
    const nestedListItems = targetLine.children[0].children
    const itemIdxToUpdate = randomInteger(0, nestedListItems.length - 1)
    nestedListItems[itemIdxToUpdate].textContent = randomInteger(0, 10)
  }
}

onMounted(() => {
  const items = document.querySelectorAll('.list__item')

  items.forEach((item, i) => {
    const o = new IntersectionObserver((entries) => observerCallBack(entries, i))
    o.observe(item)
    observers.push(o)
  })

  intervalIdx = setInterval(updateOnTick, 1000)
})

onUnmounted(() => {
  observers.forEach((o) => o.disconnect())
  clearInterval(intervalIdx)
})
</script>

<style>
.list {
  list-style: none;
}
.list__item {

}
.nested-list {
  display: flex;
  list-style: none;
}
.nested-list__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  border: 1px solid silver;
  transition: transform 0.3s linear;
}
.nested-list__item:hover {
  transform: scale(0.8);
}
</style>
