<script setup lang="ts">
import type { ColumnDef, ColumnFiltersState, VisibilityState, SortingState } from '@tanstack/vue-table'
import { ref } from 'vue'
import axios from "axios";
import { useQuery } from "@tanstack/vue-query";
import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import CategoriesForm from './components/CategoriesForm.vue'
import DropdownAction from './components/DropdownAction.vue';

const { data, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  },
  initialData: []
});

const columns: ColumnDef<any>[] = [
  {
    id: 'index',
    header: () => h('div', { class: 'text-center' }, 'No.'),
    cell: ({ row }) => h('div', { class: 'text-center' }, (row.index + 1).toString()),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Category',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },  
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original
      return h('div', { class: 'relative' }, [
        h(DropdownAction, {
          category,
          onExpand: row.toggleExpanded,
        })
      ])
    },
  },
]

// Table state
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const isEditModalOpen = ref(false)

// Initialize table
const table = useVueTable({
  get data() { return data.value || [] },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
  },
  filterFns: {
    fuzzy: (row, columnId, filterValue) => {
      const value = row.getValue(columnId)
      if (!value) return false
      return value.toString().toLowerCase().includes(filterValue.toLowerCase())
    },
  },
  onColumnFiltersChange: (updater) => {
    columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater
  },
})

const handleSearch = (value: string) => {
  table.getColumn('name')?.setFilterValue(value)
}
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <Input
        class="max-w-52"
        placeholder="Search category..."
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @input="(e: any) => handleSearch((e.target as HTMLInputElement).value)"
      />
      <Button @click="isEditModalOpen = true">
        Create
      </Button>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow 
              v-for="row in table.getRowModel().rows" 
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No data.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- You'll need to create a CategoryForm component similar to BookForm -->
    <CategoriesForm
      :open="isEditModalOpen"
      :is-edit="false"
      @update:open="isEditModalOpen = false"
      aria-describedby="category-form-description"
    />
  </div>
</template>
