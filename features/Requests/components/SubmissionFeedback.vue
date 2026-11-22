<script setup lang="ts">
defineProps<{ status: string, message: string, receiptId: string }>()
</script>

<template>
  <div
    aria-live="polite"
    aria-atomic="true"
  >
    <div
      v-if="message"
      class="mt-4 rounded-xl border p-4 text-sm leading-6"
      :class="status === 'success' ? 'border-green-200 bg-green-50 text-green-900' : 'border-red-200 bg-red-50 text-red-900'"
      :role="status === 'error' ? 'alert' : 'status'"
    >
      <p>{{ message }}</p>
      <p
        v-if="receiptId"
        class="mt-2 break-all text-xs"
      >
        Protocolo: {{ receiptId }}
      </p>
    </div>
  </div>
</template>
