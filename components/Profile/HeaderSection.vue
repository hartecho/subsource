<template>
  <section class="profile-header-section">
    <div class="profile-header">
      <div class="profile-info">
        <div class="profile-image">
          <img :src="resolvedImgPath()" alt="Contractor Picture" />
        </div>
        <div class="profile-details">
          <h1>{{ business.company }}</h1>
          <!-- Conditionally display "Individual" or "Group" based on the existence of the isIndividual field -->
          <p
            v-if="business.hasOwnProperty('isIndividual')"
            class="business-type"
          >
            Subcontractor {{ business.isIndividual ? "Individual" : "Group" }}
          </p>
          <div class="ratings-section">
            <p v-if="business.ratings > 0" class="star-rating">
              {{ business.ratings.toFixed(1) }}
            </p>
            <div v-if="business.ratings > 0" class="stars">
              <span v-for="n in 5" :key="n" class="star">
                {{ n <= roundedRating ? "★" : "☆" }}
              </span>
            </div>
            <p v-if="business.ratings > 0" class="star-rating">
              ({{ business.reviewCount }})
            </p>
            <p v-else class="no-reviews">Be the first to leave a review!</p>
          </div>
          <ul class="job-types">
            <li v-for="(tag, index) in business.tags" :key="tag">
              {{ tagDescriptions[tag]
              }}<span v-if="index < business.tags.length - 1"> - </span>
            </li>
          </ul>
          <div class="actions">
            <!-- <button
              class="contact-business-button"
              @click="contactContractor"
            >
              Contact Contractor
            </button> -->
            <button
              v-if="!business.isClaimed"
              class="report-button"
              @click="claimBusiness"
            >
              Claim This Business
            </button>
            <button class="report-button" @click="router.push('/contact')">
              Report an Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  business: Object,
  tagDescriptions: Object,
  contactContractor: Function,
  roundedRating: Number,
});

const router = useRouter();

const resolvedImgPath = () => {
  return `/${props.business.picture}`;
};

const claimBusiness = () => {
  router.push({
    path: "/claimBusiness",
    query: {
      company: props.business.company,
      _id: props.business._id,
    },
  });
};
</script>

<style scoped>
.profile-header-section {
  font-family: Arial, sans-serif;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 4rem 1rem 4rem;
  height: 100%;
}

@media (max-width: 768px) {
  .profile-header-section {
    flex-direction: row;
    padding: 2rem 1rem;
    margin: 0;
  }
}

.profile-header {
  display: flex;
  justify-content: left;
  align-items: flex-end; /* Align content at the bottom */
  flex-wrap: wrap;
}

.profile-info {
  text-align: left;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 3rem;
  text-shadow: 2px 2px 1px black;
  z-index: 2;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    gap: 1rem;
  }
}

.profile-image {
  width: 15rem;
  height: 15rem;
  border-radius: 8px;
  margin-bottom: 20px;
}

.profile-image img {
  height: 100%;
  width: 100%;
}

@media (max-width: 768px) {
  .profile-image {
    width: 10rem;
    height: 10rem;
  }
}

@media (max-width: 480px) {
  .profile-image {
    width: 7rem;
    height: 7rem;
  }
}

.profile-details {
  flex: 1;
}

.profile-details h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.business-type {
  font-size: 18px;
  /* margin-bottom: 10px; */
}

@media (min-width: 768px) {
  .profile-details h1 {
    font-size: 48px;
  }

  .business-type {
    font-size: 24px;
  }
}

.ratings-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.star-rating {
  font-size: 24px;
}

@media (min-width: 768px) {
  .star-rating {
    font-size: 36px;
  }
}

.no-reviews {
  font-size: 18px;
}

@media (min-width: 768px) {
  .no-reviews {
    font-size: 24px;
  }
}

.stars {
  display: flex;
}

.star {
  color: #ff9900;
  font-size: 24px;
}

@media (min-width: 768px) {
  .star {
    font-size: 36px;
  }
}

.job-types {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.job-types li {
  display: inline;
}

@media (min-width: 768px) {
  .job-types {
    font-size: 18px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

@media (min-width: 768px) {
  .actions {
    gap: 20px;
  }
}

.contact-business-button,
.report-button {
  background-color: #007bff;
  color: white;
  text-shadow: 1px 1px 2px black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

@media (min-width: 768px) {
  .contact-business-button,
  .report-button {
    font-size: 16px;
  }
}

.contact-business-button:hover,
.report-button:hover {
  background-color: #0056b3;
}
</style>
