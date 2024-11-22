<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import AlertConfirm from './AlertConfirm.vue'
import { useRouter } from 'vue-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const formSchema = toTypedSchema(
  z.object({
    oldPassword: z.string().min(2, 'Old password must be at least 2 characters'),
    newPassword: z.string().min(2, 'New password must be at least 2 characters'),
    confirmPassword: z.string().min(2, 'Confirm password must be at least 2 characters'),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

const showResetModal = defineModel('open', { type: Boolean, required: true })
const token = localStorage.getItem('token')
const showAlert = ref(false)
const showLogoutConfirm = ref(false)

const router = useRouter()

const handlePasswordReset = async (values: any) => {
  if (values.newPassword !== values.confirmPassword) {
    showAlert.value = true
    return
  }
  
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/profile/change-password`, {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    showLogoutConfirm.value = true
    showAlert.value = false
  } catch (error) {
    console.error(error)
    showAlert.value = true
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const handleClose = () => {
  showResetModal.value = false
  showLogoutConfirm.value = false
}

</script>

<template>
  <div class="space-y-8">

    <Dialog v-model:open="showResetModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        
        <Form @submit="handlePasswordReset">
          <div class="space-y-6">
            <div v-if="showAlert" class="text-sm text-red-500">
              Passwords do not match or an error occurred. Please try again.
            </div>
            
            <FormField v-slot="{ field }" name="oldPassword">
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input v-bind="field" type="password" placeholder="Enter new password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="newPassword">
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input v-bind="field" type="password" placeholder="Confirm new password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="confirmPassword">
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input v-bind="field" type="password" placeholder="Confirm new password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <DialogFooter>
              <Button type="submit">Reset Password</Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>

    <AlertDialog v-model:open="showLogoutConfirm">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Password Changed Successfully</AlertDialogTitle>
          <AlertDialogDescription>
            Your password has been updated. Would you like to logout now?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction @click="handleLogout">Yes, Logout</AlertDialogAction>
          <AlertDialogCancel @click="handleClose">No, Stay Logged In</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>