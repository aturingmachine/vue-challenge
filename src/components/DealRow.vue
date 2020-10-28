<template>
  <div class="pa-3 mb-1 elevation-3 row-container">
    <img
      :src="deal.image"
      class="deal-image modal-link"
      @click="openDialog()"
    />
    <div class="details-container ml-2">
      <div class="details-main">
        <a @click="openDialog()" class="modal-link headline-4">
          {{ deal.headline }}
        </a>
        <p>
          {{ deal.description_preview }}
        </p>
      </div>

      <div class="subtitle-2 details-footer">
        <span class="editor-tag"> From: {{ deal.editor }} </span>
        <div>
          <v-chip
            v-for="category in deal.categories"
            :key="category.slug"
            class="caption mr-1"
            small
          >
            {{ category.name }}
          </v-chip>
        </div>
      </div>
    </div>

    <div class="aux-container">
      <img :src="deal.merchant.logo_urls['100x32']" />
      <v-chip
        class="ma-2"
        color="green"
        text-color="white"
        v-if="deal.brads_deals_exclusive"
      >
        Exclusive!
      </v-chip>
      <CountdownTimer :expiryTime="deal.expires_at" />
    </div>

    <v-dialog max-width="700" v-model="detailsDialog">
      <DealModal :deal="deal" />
    </v-dialog>
  </div>
</template>

<script>
import DealModal from './DealModal';
import CountdownTimer from './CountdownTimer';

export default {
  data: () => {
    return {
      detailsDialog: false
    };
  },

  components: {
    DealModal,
    CountdownTimer
  },

  props: {
    deal: {
      type: Object
    }
  },

  methods: {
    openDialog() {
      this.detailsDialog = true;
    }
  }
};
</script>

<style scoped>
.row-container {
  display: flex;
}

.details-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.deal-image {
  border-radius: 80px;
  height: 160px;
  width: 160px;
}

.aux-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.expiration-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.details-footer {
  display: flex;
  justify-content: space-between;
}

.modal-link {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;
}

.modal-link:hover {
  text-decoration: underline;
}

@media screen and (max-width: 900px) {
  .row-container {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .details-container {
    flex-direction: column;
  }

  .aux-container {
    flex-direction: row;
    width: 100%;
  }
}
</style>
