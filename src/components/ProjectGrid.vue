<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import type { Project } from "./Projects.astro";

const props = defineProps<{
  projects: Project[];
  categories: string[];
}>();

const selectedCategory = ref("All");
const isTransitioning = ref(false);
const projectRefs = ref<HTMLElement[]>([]);

const filteredProjects = computed(() => {
  if (selectedCategory.value === "All") return props.projects;
  return props.projects.filter(
    (project) => project.category === selectedCategory.value,
  );
});

const categoryStats = computed(() => {
  const stats: Record<string, number> = {};
  stats["All"] = props.projects.length;
  
  props.categories.forEach(category => {
    if (category !== "All") {
      stats[category] = props.projects.filter(p => p.category === category).length;
    }
  });
  
  return stats;
});

async function selectCategory(category: string) {
  if (category === selectedCategory.value || isTransitioning.value) return;
  
  isTransitioning.value = true;
  selectedCategory.value = category;
  
  await nextTick();
  setTimeout(() => {
    isTransitioning.value = false;
  }, 300);
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/placeholder-project.svg';
  img.alt = 'Project image unavailable';
}

function getProjectAriaLabel(project: Project): string {
  return `${project.title} project. ${project.description}. Built with ${project.tags.slice(0, 3).join(', ')}.`;
}

</script>

<template>
  <!-- Category Filter -->
  <div class="flex justify-center gap-2 sm:gap-4 mb-8" role="tablist" aria-label="Project categories">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      :class="{
        'bg-accent text-background shadow-md': selectedCategory === category,
        'bg-primary/10 text-text hover:bg-primary/20': selectedCategory !== category
      }"
      class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      :aria-pressed="selectedCategory === category"
      :aria-label="`Filter projects by ${category}`"
      role="tab"
      :disabled="isTransitioning"
    >
      {{ category }}
      <span 
        class="ml-1 text-xs opacity-75"
        aria-label="`${categoryStats[category]} projects`"
      >
        ({{ categoryStats[category] }})
      </span>
    </button>
  </div>

  <!-- Projects Grid -->
  <div 
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    :class="{ 'opacity-70 pointer-events-none': isTransitioning }"
  >
    <article
      v-for="(project, index) in filteredProjects"
      :key="project.title"
      :ref="el => { if (el) projectRefs[index] = el as HTMLElement }"
      class="group relative overflow-hidden rounded-2xl bg-surface border border-border/20 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
      :aria-label="getProjectAriaLabel(project)"
      :style="{ '--delay': `${index * 50}ms` }"
    >
      <!-- Project Image -->
      <div class="aspect-video overflow-hidden rounded-t-2xl bg-primary/5 relative">
        <img
          :src="project.image"
          :alt="`Screenshot of ${project.title} project`"
          loading="lazy"
          @error="handleImageError"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <!-- Quick action overlay -->
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-medium hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            :aria-label="`View ${project.title} source code on GitHub`"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
            </svg>
            Code
          </a>
          
          <a
            v-if="project.demoLink"
            :href="project.demoLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            :aria-label="`View ${project.title} live demo`"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Demo
          </a>
        </div>
      </div>

      <!-- Project Content -->
      <div class="p-4 sm:p-6">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg sm:text-xl font-semibold text-text group-hover:text-accent transition-colors leading-tight">
              {{ project.title }}
            </h3>
            <span 
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent shrink-0"
              :title="`${project.category} project`"
            >
              {{ project.category }}
            </span>
          </div>
          
          <p class="text-sm sm:text-base text-text/70 line-clamp-2">
            {{ project.description }}
          </p>
          
          <!-- Extended description on hover/focus -->
          <div class="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300">
            <p class="text-sm text-text/60 italic">
              {{ project.extendedDescription }}
            </p>
          </div>
        </div>

        <!-- Technology Tags -->
        <div class="mt-4 flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
          <span
            v-for="(tag, tagIndex) in project.tags.slice(0, 5)"
            :key="tagIndex"
            role="listitem"
            class="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-xs font-medium text-text/80 hover:bg-accent/10 hover:text-accent transition-colors"
            :title="`Built with ${tag}`"
          >
            {{ tag }}
          </span>
          <span
            v-if="project.tags.length > 5"
            class="inline-flex items-center px-2 py-1 rounded-md bg-primary/5 text-xs font-medium text-text/60"
            :title="`And ${project.tags.length - 5} more: ${project.tags.slice(5).join(', ')}`"
          >
            +{{ project.tags.length - 5 }}
          </span>
        </div>

        <!-- Action Links -->
        <div class="mt-4 flex items-center gap-3">
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors focus:outline-none focus:underline"
            :aria-label="`View ${project.title} source code`"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            View Code
          </a>
          
          <a
            v-if="project.demoLink"
            :href="project.demoLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-accent transition-colors focus:outline-none focus:underline"
            :aria-label="`View ${project.title} live demo`"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </article>
  </div>

  <!-- Empty State -->
  <div 
    v-if="filteredProjects.length === 0"
    class="text-center py-12"
  >
    <div class="text-text/40 text-6xl mb-4">🔍</div>
    <h3 class="text-lg font-medium text-text mb-2">No projects found</h3>
    <p class="text-text/60">Try selecting a different category.</p>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

article {
  animation: slideInUp 0.6s ease-out calc(var(--delay)) both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article:focus-within {
  transform: translateY(-2px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
