import { useDraggable } from 'vue-draggable-plus';

export const qhDraggable = (
  el: Ref<HTMLElement | undefined>,
  list: Ref<unknown[] | undefined>,
) => {
  const dragStart = ref(false);

  return useDraggable(el, list, {
    animation: 150,
    ghostClass: 'ghost',
    onStart() {
      dragStart.value = true;
    },
    onUpdate() {
      console.log('update');
    },
  });
};
