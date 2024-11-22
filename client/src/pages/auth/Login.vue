<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'vue-router';

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/pages/auth/auth";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(3),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: "",
    password: "",
  },
});

const router = useRouter();
const authStore = useAuthStore();
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`, 
      {
        username: values.username,
        password: values.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      authStore.setToken(token);

      try {
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        localStorage.setItem('userInfo', JSON.stringify(profileResponse.data.data));
        authStore.setUserInfo(profileResponse.data.data);
      } catch (profileError) {
        console.error('Failed to fetch profile:', profileError);
      }

      router.push({ name: 'Books' });
    }
  } catch (error: any) {
    console.error('Login failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Login</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <a @click="router.push({ name: 'Register' })" class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
            register new account
          </a>
        </p>
      </div>

      <form @submit="onSubmit" class="mt-8 space-y-6">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel class="text-gray-700 font-medium">Username</FormLabel>
            <FormControl>
              <Input
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                type="text"
                placeholder="Enter username"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-red-500 text-sm" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="flex flex-col items-start gap-2">
            <FormLabel class="text-gray-700 font-medium">Password</FormLabel>
            <FormControl>
              <Input
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                type="password"
                placeholder="Enter password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-red-500 text-sm" />
          </FormItem>
        </FormField>

        <div class="space-y-4">
          <Button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
