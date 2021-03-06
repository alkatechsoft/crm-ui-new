<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 "
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <font-awesome-icon icon="bars" class="text-denim-800  group-hover:text-denim-300" />
      </button>
      <!-- Brand -->
      <nuxt-link

        to="/backend/dashboard"
      >
        <img class="md:w-36 w-24 " src="~/assets/images/alkatech-logo.png" :alt="$config.appName">


      </nuxt-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <admin-components-dropdowns-notification-dropdown />
        </li>
        <li class="inline-block relative">
         <admin-components-dropdowns-user-dropdown/>
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <nuxt-link
                class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                to="/backend/dashboard"
              >
                {{$config.appName}}
              </nuxt-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <font-awesome-icon icon="times" class="text-denim-800  group-hover:text-denim-300" />
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="px-3 py-2 h-12 border border-solid border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Template Management
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <nuxt-link
              to="/backend/templates/email-templates/upload-email-template"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tv mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Upload Email Template
              </a>
              </nuxt-link>
          </li>

          <li class="items-center">
            <nuxt-link
              to="/backend/templates/sms-templates/create-sms-template"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tv mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Create SMS Template
              </a>
            </nuxt-link>
          </li>

          <li class="items-center">
            <nuxt-link
              to="/backend/templates/list-templates"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                List Templates
              </a>
              </nuxt-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
        Client Management
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="items-center">
            <nuxt-link
              to="/backend/clients/upload-clients"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                Upload Subscribers list
              </a>
            </nuxt-link>
          </li>

          <li class="items-center">
            <nuxt-link
              to="/backend/clients/add-new-client"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
               Add new Subscriber
              </a>
            </nuxt-link>
          </li>

          <li class="items-center">
            <nuxt-link
              to="/backend/clients/list-clients"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                List Subscribers
              </a>
            </nuxt-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          Scheduler Management
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="items-center">
            <nuxt-link
              to="/backend/scheduler/mail-scheduler"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
               schedule mail campaign
              </a>
            </nuxt-link>
          </li>

          <li class="items-center">
            <nuxt-link
              to="/backend/scheduler/mail-scheduler-report"
              v-slot="{ href, route, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-500 hover:text-denim-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-400']"
                ></i>
                mail scheduler reports
              </a>
            </nuxt-link>
          </li>


        </ul>


      </div>
    </div>
  </nav>
</template>
); }

<script>
// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.vue";
// import UserDropdown from "components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    // NotificationDropdown,
    // UserDropdown,
  },
};
</script>
