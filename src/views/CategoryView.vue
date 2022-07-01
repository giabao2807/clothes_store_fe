<template>
  <div class="page-category">
    <div class="column is-multiple">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>

      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductBox from "./ProductBox.vue";

export default {
  name: "CategoryView",
  data() {
    return {
      products: {},
      category: {},
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    $route(to, from) {
        if (to.name === "categoryview") {
            this.getProducts()
        }
    }
  },
  methods: {
    async getProducts() {
      const category_slug = this.$route.params.category_slug;

      this.$store.commit("setIsLoading", true);

      axios
        .get(`/api/v1/products/${category_slug}`)
        .then((response) => {
          this.category = response.data;
          this.products = this.category.products;

          document.title = this.category.name + " | Djackets";
        })
        .catch((error) => {
          console.log(error);

          toast({
            message: "Something went wrong. Please try again",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
