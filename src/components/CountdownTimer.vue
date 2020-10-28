<template>
  <div class="expiration-timer button">{{ expirationLabel }}</div>
</template>

<script>
export default {
  data: () => {
    return {
      expiryTimeout: undefined,
      expirationLabel: undefined,
      hasExpired: true
    };
  },

  props: {
    expiryTime: {
      type: String,
      required: true
    }
  },

  methods: {
    calculateExpirationTime() {
      const countDownDate = new Date(this.expiryTime).getTime();
      let now = new Date().getTime();

      let distance = countDownDate - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      this.expirationLabel =
        'Expires In: ' + days + 'd ' + hours + 'h ' + minutes + 'm ';

      if (distance < 0) {
        this.hasExpired = true;
        clearInterval(this.expiryTimeout);
        this.expirationLabel = 'EXPIRED';
      } else {
        this.hasExpired = false;
      }
    }
  },

  mounted() {
    this.calculateExpirationTime();
    this.expiryTimeout = setInterval(
      this.calculateExpirationTime.bind(this),
      60000
    );
  }
};
</script>

<style scoped>
.expiration-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
