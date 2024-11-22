<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'vue-router';

interface Role {
  _id: string;
  name: string;
  permissions: any[];
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(5).max(50),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
    fullName: z.string().min(5)
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  },
});

const router = useRouter();

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${import.meta.env.VITE_API_URL}/auth/register`, 
      {
        username: values.username,
        email: values.email,
        password: values.password,
        fullName: values.fullName
      }
    );

    if (response.data.success || response.status === 200) {
      alert('Register success!');
      await router.push('/login');
    } else {
      alert(response.data.message || 'Register failed');
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Register failed');
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-center text-gray-900">Đăng ký tài khoản</h1>
      
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="text"
                placeholder="Enter username"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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
                type="email"
                placeholder="Enter email"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="password"
                placeholder="Enter password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <Input
                class="w-full mt-0"
                type="password"
                placeholder="Confirm password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full">Register</Button>
      </form>

      <div class="text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="font-medium text-primary hover:underline">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>
