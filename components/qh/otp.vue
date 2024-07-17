<template>
  <div class="flex flex-col">
    <div style="display: flex; flex-direction: row" class="qh-flex-center">
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        :conditionalClass="['one', 'two', 'three', 'four']"
        inputType="number"
        :num-inputs="4"
        class="otp-input-container"
        v-model:value="bindValue"
        :should-auto-focus="true"
        :should-focus-order="true"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
    </div>

    <div class="qh-flex-center my-8 flex-col gap-2">
      <qh-button
        @click.capture="restartCountDown()"
        :disabled="disableResendButton"
        :class="
          disableResendButton ? '' : '!border-2 !border-brand !bg-transparent'
        "
        class="!h-10 !rounded-3xl !px-12 disabled:!bg-brand"
        type="button"
        variant="outline"
      >
        <div class="qh-flex-center" v-if="disableResendButton">
          <span class="mx-2 block text-lg text-white">{{ countDown }}</span>
          <RiAlarmLine class="text-border h-5 w-5" />
        </div>
        <span class="block font-medium text-brand" v-else>Resend</span>
      </qh-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RiAlarmLine } from 'vue-remix-icons';
import VOtpInput from 'vue3-otp-input';

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindValue = defineModel<string>('');
const emit = defineEmits(['resend', 'update:modelValue']);
const countDown = ref(59);
const disableResendButton = ref(false);

const startCountDown = () => {
  disableResendButton.value = true;
  const startInterval = setInterval(() => {
    --countDown.value;
    if (countDown.value <= 0) {
      clearInterval(startInterval);
      disableResendButton.value = false;
    }
  }, 1000);
};

const restartCountDown = () => {
  countDown.value = 59;
  startCountDown();
  emit('resend');
};

const handleOnComplete = (value: string) => {
  console.log('OTP completed: ', value);
};

const handleOnChange = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<style lang="scss">
.otp-input-container input {
  padding: 10px;
  margin: 5px;
  color: var(--brand);
  border: 1px solid var(--dark-200);
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
}

.otp-input-container input:focus {
  border: 2px solid var(--brand-500);
  color: var(--brand);
  background-color: var(--brand-50);
  outline: none;
}

.otp-input {
  width: 50px;
  height: 50px;
  padding: 10px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 8px;
  display: inline;
  text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: var(--brand-500);
  color: var(--brand-50);
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
