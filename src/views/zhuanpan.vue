<template>
  <div
    class="turntable-wrap"
    style="display: inline-block"
  >
    <div
      class="turntable"
      style="display: inline-block"
    >
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="turntable-item"
        :style="{transform: `rotate(${index * 60}deg) skewY(-30deg)`, background: item.color}"
      >
        <span class="prize-name">{{ item.name }}</span>
      </div>
    </div>
    <div
      class="center-button"
      @click="handleStar"
    />
    <div
      class="guide-pointer"
      :style="{transform: `rotate(${rotateIndex}deg)`}"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        {
          id: 1,
          color: this.getRandomColor(),
          name: '麦当劳'
        },
        {
          id: 2,
          color: this.getRandomColor(),
          name: '烧鸭饭'
        },
        {
          id: 3,
          color: this.getRandomColor(),
          name: '潮汕粉'
        },
        {
          id: 4,
          color: this.getRandomColor(),
          name: '探扒1'
        },
        {
          id: 5,
          color: this.getRandomColor(),
          name: '探扒2'
        },
        {
          id: 6,
          color: this.getRandomColor(),
          name: '探扒3'
        }
      ],
      rotateIndex: 1
    }
  },
  methods: {
    handleStar () {
      setInterval(() => {
        this.rotateIndex += ++this.rotateIndex
      }, 100)
    },
    getRandomColor () {
      return '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
        return i > 5 ? null : a[Math.floor(Math.random() * 16)]
      }).join('')
    }
  }
}
</script>
<style lang="scss">
.turntable-wrap {
  position: relative;
  top: 50%;
  left: 50%;
  .turntable {
    position: absolute;
    padding: 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    list-style: none;
    overflow: hidden;
    .turntable-item {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 50%;
      transform-origin: 0% 100%;
      .prize-name {
        font-size: 18px;
        color: #fff;
        position: absolute;
        top: 50px;
        left: 13px;
        transform: rotate(54deg);
      }
    }
  }
  .center-button {
    z-index: 99;
    position: absolute;
    font-size: 18px;
    top: 85px;
    left: 85px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #5aa8e5;
  }
  .guide-pointer {
    transition: all 0.2s;
    position: absolute;
    transform: rotate(30deg);
    transform-origin: bottom;
    top: 33px;
    left: 96px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 70px solid #000;
    border-radius: 23px;
  }
}
</style>
