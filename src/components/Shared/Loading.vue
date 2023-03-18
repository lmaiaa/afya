<template>
  <div class="loading-spinner">
    <div class="spinner-container">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes spinner-container {
  0% {
    transform: translate(12px, 80px) scale(0);
  }
  25% {
    transform: translate(12px, 80px) scale(0);
  }
  50% {
    transform: translate(12px, 80px) scale(1);
  }
  75% {
    transform: translate(80px, 80px) scale(1);
  }
  100% {
    transform: translate(148px, 80px) scale(1);
  }
}
@keyframes spinner-container-r {
  0% {
    transform: translate(148px, 80px) scale(1);
  }
  100% {
    transform: translate(148px, 80px) scale(0);
  }
}
@keyframes spinner-container-c {
  0% {
    background: #1c4595;
  }
  25% {
    background: #e7e5e8;
  }
  50% {
    background: #01080a;
  }
  75% {
    background: #e76a24;
  }
  100% {
    background: #1c4595;
  }
}
.spinner-container div {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(80px, 80px) scale(1);
  background: #1c4595;
  animation: spinner-container 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.spinner-container div:nth-child(1) {
  background: #e76a24;
  transform: translate(148px, 80px) scale(1);
  animation: spinner-container-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1),
    spinner-container-c 1s infinite step-start;
}
.spinner-container div:nth-child(2) {
  animation-delay: -0.25s;
  background: #1c4595;
}
.spinner-container div:nth-child(3) {
  animation-delay: -0.5s;
  background: #e76a24;
}
.spinner-container div:nth-child(4) {
  animation-delay: -0.75s;
  background: #01080a;
}
.spinner-container div:nth-child(5) {
  animation-delay: -1s;
  background: #e7e5e8;
}
.loading-spinner {
  width: 100%;
  height: 90%;
  position: fixed;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
}
.spinner-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 35%;
  left: 45%;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.spinner-container div {
  box-sizing: content-box;
}
</style>
