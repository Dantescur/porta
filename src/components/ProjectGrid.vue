<script setup lang="ts">

import { computed, ref } from "vue";
import type { Project } from "./Projects.astro";

const props = defineProps<{
  projects: Project[];
  categories: string[];
}>();

const selectedCategory = ref("All");


const filteredProjects = computed(() => {
  if (selectedCategory.value === "All") return props.projects;
  return props.projects.filter(
    (project) => project.category === selectedCategory.value,
  );
});
</script>

<template>
  <div class="flex justify-center gap-4 mb-8">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectedCategory = category"
      :class="{ 'bg-accent/20': selectedCategory === category }"
      class="px-4 py-2 rounded-full bg-primary/10 text-sm font-medium hover:bg-accent/10 transition-colors"
    >
      {{ category }}
    </button>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    <article
      v-for="project in filteredProjects"
      :key="project.title"
      class="group relative overflow-hidden rounded-2xl bg-surface p-4 sm:p-6 shadow-theme hover:shadow-lg transition-shadow border border-border/20 hover:border-accent/30"
    >
      <div class="aspect-video overflow-hidden rounded-xl bg-primary/5">
        <img
          :src="project.image"
          :alt="project.title"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div
        class="mt-4 sm:mt-6 group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-300"
      >
        <h3
          class="text-lg sm:text-xl font-semibold text-text group-hover:text-accent transition-colors"
        >
          {{ project.title }}
        </h3>
        <p class="mt-2 text-sm sm:text-base text-text/70">
          {{ project.description }}
        </p>

        <!-- Tags -->
       <div class="mt-3 sm:mt-4 grid grid-cols-3 gap-2">
          <span
            v-for="(tag, index) in project.tags.slice(0, 6)" 
            :key="index"
            class="truncate rounded-full bg-primary/10 px-2 py-1 text-xs text-center font-medium text-text hover:bg-accent/10 transition-colors"
            :title="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div
        class="absolute inset-0 bg-surface/90 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end"
      >
        <h3 class="text-xl font-bold text-text">{{ project.title }}</h3>
        <p class="mt-2 text-sm text-text/80">
          {{ project.extendedDescription }}
        </p>

        <a
          class="mt-4 inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          :href="project.link"
        >
          View Project
        </a>

        <!-- Live Demo Button -->
        <a v-if="project.demoLink"
          target="_blank"
          :href="project.demoLink"
          class="mt-2 inline-flex items-center gap-2 text-text hover:text-accent transition-colors"
        >
          Live Demo
        </a>
      </div>
    </article>
  </div>
</template>

