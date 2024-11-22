<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient, useQuery } from "@tanstack/vue-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { watch } from 'vue';

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CategoryResponse {
  data: {
    name: string;
    description: string;
    id: string;
    // Add other fields if needed
  }
}

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Please enter category name"),
    description: z.string().min(1, "Please enter description"),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
    description: "",
  },
});

const router = useRouter();
const token = localStorage.getItem('token');

// Add props
const props = defineProps<{
  open: boolean;
  isEdit?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const queryClient = useQueryClient();

const categoryQuery = useQuery({
  queryKey: ['category', props.id],
  queryFn: async () => {
    try {
      const response = await axios.get<CategoryResponse>(`${import.meta.env.VITE_API_URL}/category/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert('You do not have permission to access');
        router.push('/login');
      }
      throw error;
    }
  },
  enabled: !!props.id,
  retry: false,
});
watch(
  () => categoryQuery.data.value,
  (newData) => {
    if (newData?.data && props.isEdit) {
      const categoryData = newData.data;
      form.setValues({
        name: categoryData.name,
        description: categoryData.description,
      });
    }
  },
  { immediate: true }
);
const mutation = useMutation({
  mutationFn: async (values: typeof form.values) => {
    const url = `${import.meta.env.VITE_API_URL}/category${props.isEdit ? `/${props.id}` : ''}`;
    const method = props.isEdit ? 'put' : 'post';
    return axios[method](url, values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  onSuccess: async () => {
    alert(props.isEdit ? 'Update category successfully!' : 'Add new category successfully!');
    await queryClient.invalidateQueries({ queryKey: ['categories'] });
    emit('update:open', false);
    router.push('/categories');
  },
  onError: (error: any) => {
    alert(error.response?.data?.message || `An error occurred when ${props.isEdit ? 'update' : 'add'} category`);
  }
});

const onSubmit = form.handleSubmit((values) => {
  mutation.mutate(values);
});
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Update category' : 'Add new category' }}</DialogTitle>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="text"
                placeholder="Enter category name"
                v-bind="componentField"
                :value="form.values.name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="text"
                placeholder="Enter description"
                v-bind="componentField"
                :value="form.values.description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">{{ isEdit ? 'Update' : 'Add new category' }}</Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
