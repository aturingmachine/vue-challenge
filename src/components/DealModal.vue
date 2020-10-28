<template>
  <v-card>
    <v-card-title class="modal-header">
      {{ deal.headline }}
      <v-spacer></v-spacer>
      <img :src="deal.merchant.logo_urls['100x32']" />
    </v-card-title>
    <v-card-text>
      <div class="modal-content">
        <img :src="deal.image" class=" details-deal-image" />
        <div>
          <p class="body-1" v-html="deal.description"></p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    deal: {
      type: Object
    }
  }
};
</script>

<style scoped>
.modal-header {
  word-wrap: break-word;
}

.modal-content {
  display: flex;
}

.details-deal-image {
  border-radius: 4px;
  margin-right: 20px;
}

@media screen and (max-width: 900px) {
  .modal-content {
    flex-direction: column;
    align-items: center;
  }

  .details-deal-image {
    height: 160px;
    width: 160px;
    margin: 8px 0 0 16px;
  }
}
</style>
