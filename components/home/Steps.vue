<template>
  <div class="mx-auto ml-10 flex w-[90%] flex-col justify-around">
    <h1 class="qh-text-2">
      Build Awesome <span class="text-brand">Developer</span> Portfolio and
      Resume in
      <span class="text-brand">just three steps </span>
    </h1>

    <!-- Image and steps container  -->
    <div
      class="mb-10 mx-auto ml-10 justify-center items-center flex w-full flex-col gap-x-16 gap-y-3 md:gap-y-8">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="step.class"
        class="flex w-3/5 rounded-lg border shadow items-center justify-between">
        <div class="flex flex-col p-4">
          <div
            class="flex items-center justify-start gap-x-2"
            :class="step.class">
            <qh-button class="mr-2 h-10 w-10 font-bold rounded-full">
              {{ index + 1 }}
            </qh-button>
            <h2 class="qh-text-2 font-semibold">{{ step.title }}</h2>
          </div>
          <p class="my-4 mx-1 text-justify font-light">
            {{ step.description }}
          </p>
        </div>

        <div class="">
          <component :is="step.icon" class="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepOneIcon from '~~/components/icons/StepOneIcon.vue';
import StepThreeIcon from '~~/components/icons/StepThreeIcon.vue';
import StepTwoIcon from '~~/components/icons/StepTwoIcon.vue';

const steps = markRaw([
  {
    title: 'Pick A Template',
    icon: StepOneIcon,
    class: 'step-one',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium facere fugit esse ipsam voluptatibus qui fuga, adipisci ipsum. Sunt.',
  },
  {
    title: 'Enter Details',
    icon: StepTwoIcon,
    class: 'step-two flex-row-reverse ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium facere fugit esse ipsam voluptatibus qui fuga, adipisci ipsum. Sunt.',
  },
  {
    title: 'Download Resume',
    icon: StepThreeIcon,
    class: 'step-three',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium facere fugit esse ipsam voluptatibus qui fuga, adipisci ipsum. Sunt.',
  },
]);
</script>

<style lang="scss" scoped>
.step-container {
  grid-template-areas:
    'step-one step-one step-three'
    'step-two step-two step-three';
}
#step-one {
  grid-area: step-one;
  flex-direction: row-reverse;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
  .first-child {
    margin: 20px;
  }
}
#step-two {
  grid-area: step-two;
  margin-right: 10%;
  .first-child {
    margin-top: 30px;
  }
}
#step-three {
  grid-area: step-three;
  display: flex;
  flex-direction: column-reverse;
  .first-child {
    width: 100%;
  }
}
</style>
