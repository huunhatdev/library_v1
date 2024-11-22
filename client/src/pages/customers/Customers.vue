<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ref, computed } from 'vue'
import EditCustomerModal from './components/EditCustomerModal.vue'

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  role: Role[];
}

const isEditModalOpen = ref(false)
const selectedCustomer = ref<Customer | null>(null)
const searchQuery = ref('')

const token = localStorage.getItem('token')
const queryClient = useQueryClient()
const { data } = useQuery({
  queryKey: ['users'], 
  queryFn: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;  
    } catch (error: any) {
      return [];
    }
  },
  enabled: !!token,
  initialData: []
});

const filteredCustomers = computed(() => {
  if (!data.value) return []
  return data.value.filter(customer => 
    customer.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleDelete = async (customerId: string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/user/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // Invalidate and refetch users query
    queryClient.invalidateQueries({ queryKey: ['users'] })
  } catch (error) {
    console.error('Failed to delete user:', error)
    // You might want to add error handling/notification here
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Customers</h1>
      <div class="w-72">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customers..."
          class="w-full px-4 py-2 border rounded-md"
        />
      </div>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(customer, index) in filteredCustomers" :key="customer.id">
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ customer.username }}</TableCell>
            <TableCell>{{ customer.email }}</TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                size="sm" 
                @click="() => {
                  selectedCustomer = customer;
                  isEditModalOpen = true;
                }"
              >Edit</Button>
              <Button 
                variant="destructive" 
                size="sm" 
                class="ml-2"
                @click="handleDelete(customer._id)"
              >Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <EditCustomerModal
      v-if="selectedCustomer"
      :id="selectedCustomer?._id"
      :is-edit="true"
      :open="isEditModalOpen"
      @update:open="isEditModalOpen = false"
    />
  </div>
</template>