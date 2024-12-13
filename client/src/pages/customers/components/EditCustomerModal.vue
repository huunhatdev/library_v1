<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

interface Role {
  _id: string;
  name: string;
}

interface Customer {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
}

interface CustomerResponse {
  success: boolean;
  message: string;
  data: Customer;
}

const props = defineProps<{
  open: boolean;
  isEdit?: boolean;
  id?: string;
}>();
const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const formSchema = toTypedSchema(
  z.object({
    fullName: z.string().min(1, "Please enter full name"),
    email: z.string().min(1, "Please enter email"),
    role: z.string().min(1, "Please select role"),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullName: "",
    email: "",
    role: "",
  },
});

const router = useRouter();

const token = localStorage.getItem('token');

const { data } = useQuery({
  queryKey: ['roles'],
  queryFn: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/role`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert('You do not have permission to access');
        router.push('/login');
      }
      return [];
    }
  },
  enabled: !!token,
  initialData: {
    data: {
      success: false,
      message: '',
      data: []
    }
  }
});

// Add book detail query
const customerQuery = useQuery({
  queryKey: ['customer', props.id],
  queryFn: async () => {
    try {
      const response = await axios.get<CustomerResponse>(`${import.meta.env.VITE_API_URL}/user/${props.id}`, {
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
  enabled: false,
});

// Thêm watch để theo dõi khi modal mở
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.isEdit && props.id) {
      customerQuery.refetch();
    } else {
      form.resetForm();
    }
  }
);

watch(
  () => customerQuery.data.value,
  (newData) => {
    if (newData?.data && props.isEdit) {
      const customerData = newData.data;
      form.setValues({
        fullName: customerData.fullName,
        email: customerData.email,
        role: customerData.role._id,
      });
    }
  },
  { immediate: true }
);

const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: async (values: typeof form.values) => {
    const url = `${import.meta.env.VITE_API_URL}/user${props.id ? `/${props.id}` : ''}`;
    const method = props.id ? 'put' : 'post';
    return axios[method](url, {
      ...values,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  onSuccess: async () => {
    alert(props.isEdit ? 'Update customer successfully!' : 'Add new customer successfully!');
    await queryClient.invalidateQueries({ queryKey: ['customers'] });
    await router.push('/customers');
  },
  onError: (error: any) => {
    alert(error.response?.data?.message || `An error occurred when ${props.isEdit ? 'update' : 'add'} customer`);
  }
});

const onSubmit = form.handleSubmit((values) => {
  mutation.mutate(values);
  emit('update:open', false);
});
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ props.isEdit ? 'Update customer' : 'Add new customer' }}</DialogTitle>
      </DialogHeader>
      
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="fullName">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="text"
                placeholder="Enter full name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="text"
                placeholder="Enter email"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="role">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Role</FormLabel>
            <FormControl>
              <select
                class="w-full mt-0 p-2 border rounded-md"
                v-bind="componentField"
                :value="form.values.role"
              >
                <option v-for="role in data" :key="role._id" :value="role._id">
                  {{ role.name }}
                </option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">{{ props.isEdit ? 'Update' : 'Add new customer' }}</Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
