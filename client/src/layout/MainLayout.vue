<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Home, Package2, Search, Users } from "lucide-vue-next";
import UserNav from "@/layout/UserNav.vue";
import { useAuthStore } from "@/pages/auth/auth";
 
const authStore = useAuthStore();
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <header class="border-b bg-muted/40">
      <div class="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
        <div class="flex justify-between w-full items-center">
          <div class="flex items-center gap-4">
            <a href="/books" class="flex items-center gap-2 font-semibold">
              <Package2 class="h-6 w-6" />
              <span class="">Library</span>
            </a>
            
            <nav class="hidden md:flex items-center gap-4 text-sm font-medium">
              <router-link
                to="/books"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                active-class="bg-muted text-primary"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
                  />
                </svg>
                Books
              </router-link>
              
              <router-link
                v-if="authStore.getUserInfo?.role?.name === 'admin'"
                to="/categories"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                active-class="bg-muted text-primary"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Categories
              </router-link>
              
              <router-link
                to="/profile"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                active-class="bg-muted text-primary"
              >
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </router-link>
              
              <router-link
                v-if="authStore.getUserInfo?.role?.name === 'admin'"
                to="/customers"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                active-class="bg-muted text-primary"
              >
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
                Customers
              </router-link>
            </nav>
          </div>

          <div class="flex items-center gap-4">
            <form>
              <div class="relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  class="w-[200px] appearance-none bg-background pl-8 shadow-none lg:w-[300px]"
                />
              </div>
            </form>
            <UserNav />
          </div>
        </div>
      </div>
    </header>

    <div class="flex-1 p-4">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
