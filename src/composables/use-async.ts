import { ref } from 'vue';

export function useAsyncAction<T = Promise<void>, P = void>(
  action: (params: P) => T
) {
  const loading = ref(false);

  async function start(params: P) {
    loading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await action(params);
      return result;
    } finally {
      loading.value = false;
    }
  }

  return { loading, start };
}
