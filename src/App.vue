<template>
  <div class="top"></div>
  <ul class="list">
    <li v-for="i of randomInteger(100, 150)" v-once class="list__item">
      <ul class="nested-list">
        <li v-for="i of randomInteger(10, 15)" v-once class="nested-list__item">
          {{ randomInteger(0, 10) }}
        </li>
      </ul>
    </li>
  </ul>
  <div class="bot"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { randomInteger } from './utils.js'

let intervalIdx = -1

onMounted(() => {
  const list = document.querySelector('.list')
  const listRect = list.getBoundingClientRect()
  const l = list.children.length
  const itemHeight = 100;

  intervalIdx = setInterval(() => {
    // Триггер для срабатывания "сверху"
    const offsetTop = (listRect.top - window.innerHeight) * -1
    // Индекс элемент с которого начнется обновление
    let startIdx = Math.ceil((listRect.top) / itemHeight) * -1
    startIdx = startIdx >= 0 ? startIdx : 0

    if(offsetTop < 0 || startIdx === -1 || startIdx > l - 1) return
    // кол-во элементов на экране, которые будут обновлены
    let itemsOnScreen = Math.round(window.innerHeight / itemHeight)
    itemsOnScreen = l - 1 - startIdx < itemsOnScreen ? l - startIdx : itemsOnScreen

    for (let index = startIdx; index < itemsOnScreen + startIdx; index++) {
      const items = list.children[index].children[0].children
      items[randomInteger(0, items.length - 1)].textContent  = randomInteger(0, 10)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalIdx)
})
</script>

<style>
.top {
  margin-top: 2200px;
}
.bot {
  margin-bottom: 4300px;
}

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
